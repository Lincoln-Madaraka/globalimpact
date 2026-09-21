import dimensions from "./photo-dimensions.json";

// Web-ready photos generated from /photos by `npm run images`.
export type PhotoName = keyof typeof dimensions;

export const photoSrc = (name: PhotoName) => `/images/${name}.webp`;
