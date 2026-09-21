import type { ReactNode } from "react";

// Root layout for "/" only. Every real page lives under /[locale] with its own root layout.
export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#060d1f", color: "#fff" }}>{children}</body>
    </html>
  );
}
