// Organization details used across the site, SEO metadata and structured data.
// Values marked TODO are placeholders: replace them before launch.
// Empty strings are hidden on the site automatically.
export const site = {
  name: "Global Impact Alliance",
  shortName: "GIA",
  url: "https://gia-global.org",
  email: "procurement@gia-global.org",
  offices: {
    hq: {
      city: "New York",
      region: "NY",
      country: "United States",
      countryCode: "US",
      street: "", // TODO: street address
      phone: "", // TODO: e.g. "+1 212 000 0000"
    },
    africa: {
      city: "Nairobi",
      region: "",
      country: "Kenya",
      countryCode: "KE",
      street: "", // TODO: street address
      phone: "", // TODO: e.g. "+254 20 000 0000"
    },
  },
  socials: {
    linkedin: "", // TODO
    instagram: "", // TODO
    x: "", // TODO
  },
  // Optional form backend (e.g. a Formspree or Web3Forms endpoint URL).
  // When empty, the contact form opens the visitor's email app addressed to `email`.
  formEndpoint: "",
};

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

export const officePlace = (office: { city: string; country: string }) =>
  [office.city, office.country].filter(Boolean).join(", ");
