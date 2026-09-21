// The only module that imports three.js; it is loaded lazily by SpinningEarth.
// The shading here must stay in sync with renderGlobePoster() in scripts/optimize-images.mjs,
// so that the poster is exactly frame 0 and the crossfade is invisible.
import {
  Group,
  Mesh,
  NoColorSpace,
  OrthographicCamera,
  RepeatWrapping,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Texture,
  Vector3,
  WebGLRenderer,
  type ColorSpace,
} from "three";
import globe from "@/config/globe.json";

export type EarthHandle = { dispose: () => void; setPaused: (paused: boolean) => void };

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = vec2(uv.x, 1.0 - uv.y);
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uClouds;
  uniform float uCloudShift;
  uniform float uCloudOpacity;
  uniform vec3 uSun;
  uniform vec3 uHaze;
  uniform float uHazeStrength;
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 ground = texture2D(uDay, vUv).rgb;
    float cloud = smoothstep(0.08, 0.9, texture2D(uClouds, vUv + vec2(uCloudShift, 0.0)).r) * uCloudOpacity;
    vec3 albedo = mix(ground, vec3(0.92), cloud);
    float ndl = dot(n, uSun);
    float lit = smoothstep(-0.12, 0.3, ndl);
    vec3 color = albedo * lit * (0.35 + 0.75 * max(ndl, 0.0));
    float limb = pow(1.0 - max(n.z, 0.0), 4.0) * uHazeStrength;
    color = mix(color, uHaze * lit, limb);
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

async function loadTexture(url: string, signal: AbortSignal, colorSpace: ColorSpace, anisotropy: number) {
  const blob = await (await fetch(url, { signal })).blob();
  let image: ImageBitmap | HTMLImageElement;
  if ("createImageBitmap" in window) {
    image = await createImageBitmap(blob);
  } else {
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    await img.decode();
    image = img;
  }
  const texture = new Texture(image);
  texture.colorSpace = colorSpace;
  texture.flipY = false; // the vertex shader flips v instead, so ImageBitmap and <img> behave the same
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return texture;
}

export function createEarth({ host, onReady, onFail }: { host: HTMLElement; onReady: () => void; onFail: () => void }): EarthHandle {
  const rad = Math.PI / 180;
  const controller = new AbortController();
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;touch-action:pan-y;cursor:grab";
  host.appendChild(canvas);

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 5;

  const sun = new Vector3(...(globe.sun as [number, number, number])).normalize();
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uDay: { value: null },
      uClouds: { value: null },
      uCloudShift: { value: 0 },
      uCloudOpacity: { value: globe.cloudOpacity },
      uSun: { value: sun },
      uHaze: { value: new Vector3(...(globe.haze as [number, number, number])) },
      uHazeStrength: { value: globe.hazeStrength },
    },
  });
  const geometry = new SphereGeometry(globe.radius, 160, 80);
  const earth = new Mesh(geometry, material);
  const spin0 = -(globe.startLongitude + 90) * rad;
  earth.rotation.y = spin0;
  const tilted = new Group();
  tilted.rotation.set(globe.viewTilt * rad, 0, globe.axialTilt * rad);
  tilted.add(earth);
  scene.add(tilted);

  // --- Sizing ---
  const coarse = matchMedia("(pointer: coarse)").matches;
  let cssSize = Math.max(1, host.clientWidth);
  const resize = () => {
    cssSize = Math.max(1, host.clientWidth);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2, (coarse ? 1400 : 2200) / cssSize));
    renderer.setSize(cssSize, Math.max(1, host.clientHeight), false);
    draw();
  };
  const resizeObserver = new ResizeObserver(resize);

  // --- State ---
  let ready = false;
  let paused = false;
  let visible = true;
  let angle = 0;
  let tilt = 0;
  let velocity = 0;
  let ease = 0;
  let cloudShift = 0;
  let raf = 0;
  let last = 0;
  let dragging = false;
  let lastPointer = { x: 0, y: 0, t: 0 };

  function draw() {
    if (!ready) return;
    earth.rotation.y = spin0 + angle;
    tilted.rotation.x = globe.viewTilt * rad + tilt;
    material.uniforms.uCloudShift.value = cloudShift % 1;
    renderer.render(scene, camera);
  }

  function tick(now: number) {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    if (!dragging) {
      ease = Math.min(1, ease + dt / 1.5);
      const target = paused ? 0 : globe.speed * ease;
      velocity += (target - velocity) * (1 - Math.exp(-1.8 * dt));
      angle += velocity * dt;
      tilt *= Math.exp(-2.5 * dt);
      if (!paused) cloudShift += globe.cloudDrift * dt;
    }
    draw();
    const settled = paused && !dragging && Math.abs(velocity) < 1e-4 && Math.abs(tilt) < 1e-4;
    raf = visible && !document.hidden && !settled ? requestAnimationFrame(tick) : 0;
  }

  /** Starts the loop if it isn't running; the first frame after a restart has no elapsed time. */
  function schedule() {
    if (!raf && ready) {
      last = 0;
      raf = requestAnimationFrame(tick);
    }
  }

  // --- Drag with inertia ---
  const onDown = (event: PointerEvent) => {
    dragging = true;
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = "grabbing";
    lastPointer = { x: event.clientX, y: event.clientY, t: performance.now() };
    velocity = 0;
    schedule();
  };
  const onMove = (event: PointerEvent) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = ((event.clientX - lastPointer.x) * Math.PI) / cssSize;
    const dy = ((event.clientY - lastPointer.y) * Math.PI) / cssSize;
    angle += dx;
    tilt = Math.max(-0.35, Math.min(0.35, tilt + dy));
    const dt = Math.max(1, now - lastPointer.t) / 1000;
    velocity = dx / dt;
    lastPointer = { x: event.clientX, y: event.clientY, t: now };
    draw();
  };
  const onUp = (event: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    canvas.style.cursor = "grab";
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    if (performance.now() - lastPointer.t > 80) velocity = 0; // held still: no flick
    schedule();
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);

  // --- Only run while on screen and the tab is visible ---
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
  });
  const onVisibility = () => !document.hidden && schedule();
  document.addEventListener("visibilitychange", onVisibility);

  let disposed = false;
  const fail = () => {
    if (!disposed) onFail();
  };
  const onContextLost = (event: Event) => {
    event.preventDefault();
    fail();
  };
  canvas.addEventListener("webglcontextlost", onContextLost);

  // --- Load textures, then start ---
  const watchdog = window.setTimeout(() => {
    if (!ready) {
      controller.abort();
      fail();
    }
  }, 8000);

  resizeObserver.observe(host);
  intersection.observe(host);
  const size = Math.max(1, host.clientWidth) * Math.min(window.devicePixelRatio || 1, 2);
  const big = size > 1100 && renderer.capabilities.maxTextureSize >= 4096;
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const textures: Texture[] = [];
  Promise.all([
    loadTexture(`/textures/earth-day-${big ? "4k" : "2k"}.webp`, controller.signal, SRGBColorSpace, anisotropy),
    loadTexture(`/textures/earth-clouds-${big ? "2k" : "1k"}.webp`, controller.signal, NoColorSpace, anisotropy),
  ])
    .then(([day, clouds]) => {
      if (disposed) {
        day.dispose();
        clouds.dispose();
        return;
      }
      clouds.wrapS = RepeatWrapping;
      textures.push(day, clouds);
      material.uniforms.uDay.value = day;
      material.uniforms.uClouds.value = clouds;
      renderer.initTexture(day);
      renderer.initTexture(clouds);
      ready = true;
      window.clearTimeout(watchdog);
      resize();
      onReady();
      window.setTimeout(schedule, 700); // start spinning after the poster crossfade
    })
    .catch(() => {
      if (!controller.signal.aborted) fail();
    });

  return {
    setPaused(value) {
      paused = value;
      schedule();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      controller.abort();
      window.clearTimeout(watchdog);
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      for (const texture of textures) {
        const image = texture.image as ImageBitmap | undefined;
        texture.dispose();
        if (image && "close" in image) image.close();
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
