// People shown on the About and Home pages (taken from the current GIA website).
// TODO: confirm names, roles and wording with GIA before launch; add photos via `photo`.
export type Person = { name: string; role: string; bio?: string; photo?: string };

const portrait = (slug: string) => `/images/people/${slug}.webp`;

export const founder: Person = {
  name: "Dana Ulrike Glatz",
  role: "Founder · Vision & Partnerships",
  photo: portrait("dana"),
  bio: "Dana founded Global Impact Alliance to connect Indigenous wisdom keepers, leaders and capital stewards, and builds the partnerships at the heart of the Alliance.",
};

export const team: Person[] = [
  { name: "Erik van Buuren", role: "Strategy & Science", photo: portrait("erik") },
  { name: "Camilla Moura Santos", role: "Systems Analysis & Research", photo: portrait("camilla") },
  { name: "Diego Romeiro", role: "Natural Ecosystems", photo: portrait("diego") },
  { name: "Zaenab Hage", role: "Project Management", photo: portrait("zaenab") },
];

export const advisors: Person[] = [
  {
    name: "Tomas Björkman",
    role: "Applied philosopher & social entrepreneur",
    photo: portrait("tomas"),
    bio: "Co-author of The Nordic Secret, founder of the Ekskäret Foundation and initiator of the Inner Development Goals.",
  },
  {
    name: "Satish Kumar",
    role: "Speaker & activist",
    photo: portrait("satish"),
    bio: "Editor Emeritus of Resurgence & Ecologist and founder of Schumacher College.",
  },
  {
    name: "Peter Jäderberg",
    role: "Impact investor",
    photo: portrait("peter"),
    bio: "Founder and CEO of Jäderberg & Cie and co-author of The Nordic Secret.",
  },
];

// Expert advisors listed on GIA's current website. TODO: confirm roles with GIA.
export const expertAdvisors: Person[] = [
  { name: "Flora Tram Hodac", role: "Transformation", photo: portrait("flora") },
  { name: "Pascal Tsachouridis", role: "Marketing", photo: portrait("pascal") },
  { name: "Tamas Pocze", role: "Finance", photo: portrait("tamas") },
  { name: "Andrea Friedrich", role: "Leadership", photo: portrait("andrea") },
  { name: "Martina Epple", role: "Communication", photo: portrait("martina") },
];

export const initials = (name: string) =>
  name
    .split(" ")
    .filter((part) => /^[A-ZÀ-Ž]/.test(part))
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
