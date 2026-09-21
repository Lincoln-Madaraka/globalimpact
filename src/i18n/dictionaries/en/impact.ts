import type { PhotoName } from "@/config/photos";

type Project = {
  id: string;
  title: string;
  place: string;
  focus: string;
  status: string;
  image: PhotoName;
  challenge: string;
  approach: string;
  partnership: string;
  action: string[];
  impact: string;
};

export const impact = {
  metaTitle: "Impact & projects",
  metaDescription:
    "Real projects from Global Impact Alliance and the Wisdom Age Foundation: Indigenous women's leadership in the Amazon, a natural fertiliser from Java and Indigenous innovation in Indonesia. Each told as challenge, approach, partnership, action and impact.",
  hero: {
    eyebrow: "Impact & projects",
    title: "From insight to the ground",
    lead: "Real projects, led by communities and supported through our implementation partner, the Wisdom Age Foundation.",
  },
  method: {
    eyebrow: "How we report",
    title: "Challenge → Approach → Partnership → Action → Impact",
    text: "Every project is told the same way, so partners can see what was done, why, with whom and what changed. Where results are still emerging, we say so.",
  },
  projects: [
    {
      id: "amazon-womens-leadership",
      title: "Indigenous women's leadership and conservation in the Amazon",
      place: "Jordão, Acre · Brazilian Amazon",
      focus: "Indigenous women's leadership · Conservation",
      status: "Ongoing",
      image: "community",
      challenge:
        "In the remote Jordão region of Acre, Huni Kuin women face barriers to education and economic independence, limited protection from domestic violence, and growing pressure on the forest their community depends on.",
      approach:
        "Back the women's own organisation to lead: strengthen rights and skills, open access to education and care for the forest, with decisions made by the women themselves.",
      partnership:
        "Aibu Dayá, the Huni Kuin women's association and the first Indigenous organisation in the region run by women, working with Living Gaia e.V. and the Wisdom Age Foundation.",
      action: [
        "Training and workshops on women's rights and potential",
        "School and university scholarships for women",
        "Conservation work led by the community",
        "Basic income support for women leaving domestic violence",
      ],
      impact:
        "Women in the community are building leadership, education and economic independence while caring for the forest. Detailed results will be published as they are gathered with the association.",
    },
    {
      id: "biotic-fertiliser-java",
      title: "A natural fertiliser rooted in Javanese knowledge",
      place: "Java, Indonesia",
      focus: "Regenerative agriculture · Soil health",
      status: "In development",
      image: "compliance",
      challenge:
        "Dependence on chemical fertilisers degrades soil, contaminates water and squeezes farmers' incomes.",
      approach:
        "Develop and bring to market a 100% natural liquid biotic fertiliser based on local knowledge, creating income for the community while keeping it affordable for Indonesian farmers.",
      partnership:
        "Jack, a Javanese healer, wisdom keeper and inventor, and the Mandala Wisesa community, with the Wisdom Age Foundation.",
      action: [
        "Development of the natural liquid fertiliser",
        "Testing and certification for the European market",
        "A revenue model in which European sales help subsidise access for Indonesian farmers",
      ],
      impact:
        "Designed to improve crop yield and quality while reducing the need for chemical fertilisers. The product is in development and seeking European market certification.",
    },
    {
      id: "jumpiotic-indonesia",
      title: "Jumpiotic: bringing Indigenous innovation to market",
      place: "Indonesia",
      focus: "Indigenous innovation · Fair value",
      status: "In development",
      image: "consultation",
      challenge:
        "Indigenous inventors create valuable solutions but rarely have the means to formalise them, reach markets or earn a fair return.",
      approach:
        "Help formalise and commercialise a natural remedy developed by Indigenous scientists, so that their knowledge generates income for the people who hold it.",
      partnership: "Indigenous scientists and inventors in Indonesia, with the Wisdom Age Foundation.",
      action: [
        "Formalising Jumpiotic, a natural liquid remedy made from Indonesian plant leaves",
        "Preparing the product for wider markets",
        "Building a revenue stream for its Indigenous inventors",
      ],
      impact:
        "Opens a route for Indigenous innovation to create fair economic value for its inventors. The project is in development.",
    },
  ] as Project[],
  africaNext: {
    eyebrow: "Next",
    title: "Our first African projects",
    text: "Our first projects in Africa are being developed from our hub in Kenya. They will follow the same discipline and will be published here.",
    link: "Our work in Africa",
  },
  measurement: {
    eyebrow: "Measuring what matters",
    title: "Beyond conventional metrics",
    text: "Standard indicators capture only part of the picture. Alongside them, we are co-developing the Wisdom Age Index to assess stewardship and wisdom-based leadership, including what is harder to count but no less real.",
  },
};
