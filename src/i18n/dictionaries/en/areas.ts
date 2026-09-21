type Area = {
  id: string;
  title: string;
  short: string;
  what: string;
  who: string;
  does: string[];
  outcome: string;
};

/** The eight areas of work on the "What we do" page (id = page anchor). */
export const areas: Area[] = [
  {
    id: "leadership-and-wisdom",
    title: "Leadership & Wisdom",
    short: "Leadership journeys that combine systems thinking with Indigenous and ancestral wisdom.",
    what: "Learning and reflection for people who carry long-term responsibility for capital, institutions or communities. It combines systems thinking, ecology and inner practice with the perspective of Indigenous Elders.",
    who: "CEOs and senior executives, family office principals, foundation leaders, investors and policymakers.",
    does: [
      "Runs the Wisdom Academy on systems thinking, ecology and daily practice",
      "Hosts Wisdom Retreats with Indigenous Elders for senior leaders",
      "Convenes Mothers to the World, a journey for women leading in finance, philanthropy, business and policy",
    ],
    outcome: "Leaders who decide with a longer time horizon, a wider view of consequences and a clearer sense of responsibility.",
  },
  {
    id: "indigenous-knowledge",
    title: "Indigenous Knowledge & Partnerships",
    short: "Fair, respectful partnerships between Indigenous knowledge holders and the institutions that affect their lands.",
    what: "Indigenous peoples hold knowledge of land, water and community tested over generations. We build trusted channels between knowledge holders and investors, companies and institutions, on terms set with communities rather than for them.",
    who: "Indigenous communities and organisations, wisdom keepers and land stewards, and the investors, companies and institutions that want to work with them responsibly.",
    does: [
      "Convenes the Wisdom Council of Indigenous Elders",
      "Mediates and builds bridges between communities, corporations and investors",
      "Supports Indigenous-led initiatives with fair recognition and benefit",
    ],
    outcome: "Partnerships built on consent and respect, in which traditional knowledge shapes decisions and communities share in the value they help create.",
  },
  {
    id: "impact-investment",
    title: "Impact Investment & Capital",
    short: "Patient, systemic capital for regeneration, directed with Indigenous and local partners.",
    what: "Capital shapes what gets built. We help capital stewards move beyond compliance-led ESG towards investment that restores ecosystems and strengthens communities over the long term.",
    who: "Family offices, foundations, philanthropists, banks and institutional investors.",
    does: [
      "Advises on systemic investing and philanthropic strategy",
      "Carries out project due diligence with Indigenous and local partners",
      "Designs collaborative capital mechanisms that pool resources around shared goals",
    ],
    outcome: "Capital deployed with more insight and less risk, into projects that are wanted, well governed and built to last.",
  },
  {
    id: "systemic-change",
    title: "Systemic Change",
    short: "Working on root causes: the incentives, rules and metrics that shape economies.",
    what: "Many crises share the same roots: short-term incentives, extractive business models and metrics that miss what matters. We work on those roots, not only on their symptoms.",
    who: "Policymakers, institutions, business leaders and investors ready to question underlying assumptions.",
    does: [
      "Co-develops the Wisdom Age Index, a framework for assessing stewardship beyond conventional metrics",
      "Advances the principles of the Wisdom Age Charter",
      "Brings actors together around specific shifts in finance, economy and governance",
    ],
    outcome: "Shared frameworks and standards that make long-term, regenerative decisions easier to take and to measure.",
  },
  {
    id: "research-and-knowledge",
    title: "Research & Knowledge",
    short: "Research that brings Indigenous, scientific and practical knowledge into conversation.",
    what: "Good decisions need good knowledge. We research, document and share insight where ecology, economics, leadership and Indigenous knowledge meet.",
    who: "Researchers, universities, policymakers, investors and practitioners.",
    does: [
      "Leads systems analysis and applied research with academic and field partners",
      "Publishes perspectives, case studies and reports through GIA Insights",
      "Documents what projects learn, so it can be shared and reused",
    ],
    outcome: "Evidence and ideas that decision-makers can act on, with knowledge properly recognised and credited.",
  },
  {
    id: "convening",
    title: "Convening & Strategic Dialogues",
    short: "Spaces where people who rarely meet can think, and decide, together.",
    what: "Change often starts with the right conversation. We host small, curated gatherings that bring Indigenous leaders, investors, executives, scientists and policymakers into honest dialogue.",
    who: "Alliance members, partners and invited leaders from every sector.",
    does: [
      "Hosts Wisdom Salons on leadership, nature and responsibility",
      "Runs Deep Talks for focused strategic dialogue",
      "Brings people together at Mycelium Dinners to build trust across networks",
    ],
    outcome: "Trusted relationships and shared commitments that grow into partnerships, investments and projects.",
  },
  {
    id: "community-led-impact",
    title: "Place-Based & Community-Led Impact",
    short: "Projects on the ground, led by the communities who live with the results.",
    what: "Lasting impact is local. With our implementation partner, the Wisdom Age Foundation, we support Indigenous-led and community-led projects focused on biodiversity, water and regenerative livelihoods.",
    who: "Indigenous and local communities, and the funders and partners who back them.",
    does: [
      "Identifies and supports community-led projects with the Wisdom Age Foundation",
      "Connects projects with funding, expertise and markets",
      "Tracks progress together with the communities involved",
    ],
    outcome: "Healthier ecosystems and stronger local economies, owned and shaped by the people who depend on them.",
  },
  {
    id: "africa-initiatives",
    title: "Africa Initiatives",
    short: "A growing body of work led from our African hub in Kenya.",
    what: "Africa holds some of the world's most important ecosystems, its youngest population and deep knowledge traditions. From Kenya, we are building partnerships in conservation, regenerative economies, leadership and investment.",
    who: "African communities, entrepreneurs, institutions and investors, and the international partners who work with them.",
    does: [
      "Builds partnerships across East Africa and the continent from our Kenya hub",
      "Connects African leaders and knowledge holders with the global Alliance",
      "Develops initiatives in conservation, youth entrepreneurship and impact investment",
    ],
    outcome: "African-led initiatives with the partners and capital to grow, and African perspectives at the centre of global conversations.",
  },
];
