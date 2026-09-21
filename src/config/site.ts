// Organization details used across the site, SEO metadata and structured data.
// Values marked TODO are placeholders: replace them before launch.
// Empty strings are hidden on the site automatically.
export const site = {
  name: "Global Impact Alliance",
  shortName: "GIA",
  url: "https://gia-global.org",
  email: "procurement@gia-global.org",
  phone: "", // TODO: e.g. "+90 212 000 00 00"
  address: {
    street: "", // TODO: street address
    district: "", // TODO: e.g. "Şişli"
    postalCode: "", // TODO
    city: "İstanbul",
    country: "Türkiye",
    countryCode: "TR",
  },
  geo: { latitude: 41.0082, longitude: 28.9784 }, // TODO: exact office coordinates for the map
  socials: {
    linkedin: "", // TODO: https://www.linkedin.com/company/...
    instagram: "", // TODO: https://www.instagram.com/...
    x: "", // TODO: https://x.com/...
  },
  // Optional form backend (e.g. a Formspree or Web3Forms endpoint URL).
  // When empty, the contact form opens the visitor's email app addressed to `email`.
  formEndpoint: "",
  // TODO: add leadership once ready; the About page shows this list only when it is not empty.
  team: [] as { name: string; role: { en: string; tr: string }; photo?: string }[],
};

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();
