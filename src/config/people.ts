// People shown on the About and Home pages (taken from the current GIA website).
// TODO: confirm names, roles and wording with GIA before launch; add photos via `photo`.
export type Person = { name: string; role: string; bio?: string; photo?: string };

export const founder: Person = {
  name: "Dana Ulrike Glatz",
  role: "Founder · Vision & Partnerships",
  bio: "Dana founded Global Impact Alliance to connect Indigenous wisdom keepers, leaders and capital stewards, and builds the partnerships at the heart of the Alliance.",
};

export const team: Person[] = [
  { name: "Erik van Buuren", role: "Strategy & Science" },
  { name: "Camilla Moura Santos", role: "Systems Analysis & Research" },
  { name: "Diego Romeiro", role: "Natural Ecosystems" },
  { name: "Zaenab Hage", role: "Project Management" },
];

export const advisors: Person[] = [
  {
    name: "Tomas Björkman",
    role: "Applied philosopher & social entrepreneur",
    bio: "Co-author of The Nordic Secret, founder of the Ekskäret Foundation and initiator of the Inner Development Goals.",
  },
  {
    name: "Satish Kumar",
    role: "Speaker & activist",
    bio: "Editor Emeritus of Resurgence & Ecologist and founder of Schumacher College.",
  },
  {
    name: "Peter Jäderberg",
    role: "Impact investor",
    bio: "Founder and CEO of Jäderberg & Cie and co-author of The Nordic Secret.",
  },
];

export const initials = (name: string) =>
  name
    .split(" ")
    .filter((part) => /^[A-ZÀ-Ž]/.test(part))
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
