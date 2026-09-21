import type { PhotoName } from "@/config/photos";

export type Block = { type: "p" | "h2" | "quote"; text: string };

export type Article = {
  slug: string;
  topic: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  minutes: number;
  image: PhotoName; // social preview image only
  body: Block[];
};

export const insights = {
  metaTitle: "Insights",
  metaDescription:
    "Research, perspectives, case studies and conversations from Global Impact Alliance on wisdom, leadership, capital, Indigenous knowledge, Africa and systemic change.",
  hero: {
    eyebrow: "Insights",
    title: "Ideas with substance",
    lead: "Research, perspectives and conversations where wisdom, leadership, capital and action meet.",
  },
  topics: [
    "Research",
    "Articles",
    "Reports",
    "Perspectives",
    "Indigenous knowledge",
    "Leadership insights",
    "Conversations",
    "Case studies",
  ],
  latest: "Latest",
  empty: "Nothing published in this topic yet. More research, reports and conversations are on the way.",
  caseStudiesTitle: "Case studies",
  caseStudiesLead: "Projects told as challenge, approach, partnership, action and impact.",
  contribute: {
    title: "Share your knowledge",
    text: "We publish research, reports and conversations with members and partners. If you have knowledge to share, or would like to hear when new pieces are published, get in touch.",
    cta: "Get in touch",
  },
  articles: [
    {
      slug: "why-wisdom-must-become-action",
      topic: "Perspectives",
      title: "Why wisdom must become action",
      excerpt:
        "Knowing more has not been enough. The real work is closing the distance between what we understand and what we do.",
      date: "2026-09-21",
      minutes: 4,
      image: "bonfire",
      body: [
        { type: "p", text: "There is no shortage of insight about the state of the world. Reports, summits and pledges have multiplied. Yet ecosystems continue to decline, inequality persists and many economies still reward extraction over care. The gap is not only one of knowledge. It is the gap between what we know and how we act." },
        { type: "h2", text: "Two kinds of failure" },
        { type: "p", text: "Action without wisdom is familiar: projects designed far from the places they affect, capital deployed on short timelines, solutions that move a problem rather than solve it. Wisdom without action is familiar too: sound principles that never reach a budget, a boardroom or a field." },
        { type: "p", text: "Global Impact Alliance was built to hold both together. The Path of Wisdom is how we think, learn and lead. The Path of Action is how we turn that into impact." },
        { type: "h2", text: "What wisdom adds" },
        { type: "p", text: "Wisdom, in our sense, is not abstract. It is the capacity to see a situation whole: its history, its relationships and its likely consequences over time. Indigenous and ancestral knowledge traditions have cultivated this capacity for generations, and systems thinking offers a complementary language for it. Leaders who draw on both tend to ask better questions. Who is affected? What happens in twenty years? What are we not seeing?" },
        { type: "h2", text: "What action requires" },
        { type: "p", text: "Turning wisdom into action takes structure. Communities must define the problem and lead the response. Partners need clear roles and fair terms. Capital has to be patient enough to match the timeframe of real change. And results need to be measured honestly, including what conventional metrics miss." },
        { type: "quote", text: "Wisdom without action changes nothing. Action without wisdom repeats old mistakes." },
        { type: "p", text: "That is the discipline we apply to every project: challenge, approach, partnership, action, impact. It is not complicated. It simply refuses to separate thinking from doing." },
        { type: "h2", text: "An invitation" },
        { type: "p", text: "No single organisation can close the gap between knowing and acting. That is why GIA is an alliance. If you hold knowledge, capital, influence or the capacity to act, we would like to explore what we could do together." },
      ],
    },
    {
      slug: "capital-with-a-longer-memory",
      topic: "Leadership insights",
      title: "Capital with a longer memory",
      excerpt:
        "Most capital is managed in quarters. Indigenous stewardship thinks in generations. What happens when the two meet?",
      date: "2026-09-21",
      minutes: 4,
      image: "consultation",
      body: [
        { type: "p", text: "Family offices like to say they think in generations. Many Indigenous communities actually manage land, water and relationships that way, with obligations to their ancestors and to those not yet born. The overlap is more than rhetorical. It points to a different way of managing capital." },
        { type: "h2", text: "Beyond compliance" },
        { type: "p", text: "ESG frameworks have brought sustainability into mainstream finance, and they have also shown their limits. Checklists can reward disclosure over change, and ratings can miss what matters most on the ground. A growing number of investors want to go further: to finance the regeneration of ecosystems and communities, not only to avoid harm." },
        { type: "h2", text: "Three lessons from stewardship" },
        { type: "p", text: "First, relationships come before transactions. Trust with local partners reduces risk in ways a spreadsheet cannot capture. Second, time is an asset. Soils, forests and institutions recover on their own schedules, and capital that can wait is capital that can build. Third, value is broader than return. Healthy water, living culture and local leadership are the foundations on which financial returns ultimately rest." },
        { type: "quote", text: "Capital that can wait is capital that can build." },
        { type: "h2", text: "Putting it into practice" },
        { type: "p", text: "Through the Path of Action, GIA helps capital stewards apply these lessons: project due diligence alongside Indigenous and local partners, systemic investing that targets root causes, and collaborative mechanisms that let funders pool resources around shared goals. With the Wisdom Age Index, we are also co-developing ways to assess stewardship beyond conventional metrics." },
        { type: "p", text: "The aim is not to replace financial discipline but to widen it, so that investment decisions remember what the next generation will inherit." },
      ],
    },
    {
      slug: "africa-is-not-a-problem-to-be-solved",
      topic: "Perspectives",
      title: "Africa is not a problem to be solved",
      excerpt:
        "Africa is often framed as a place in need of intervention. A more accurate, and more useful, view starts with what the continent already holds.",
      date: "2026-09-21",
      minutes: 3,
      image: "earth",
      body: [
        { type: "p", text: "Headlines about Africa tend to focus on deficits: of infrastructure, funding or stability. These challenges are real. But a view built only on deficits misses most of the story, and leads to partnerships that do not work." },
        { type: "h2", text: "What the continent holds" },
        { type: "p", text: "Africa is home to the world's youngest population and to ecosystems of global importance, from rainforests to savannas and great lakes. Its communities hold living knowledge about land, water, health and cooperation. Its entrepreneurs are building businesses in energy, agriculture, finance and technology designed for the realities of the continent." },
        { type: "h2", text: "From intervention to partnership" },
        { type: "p", text: "If Africa is seen as a source of knowledge, leadership and innovation, the role of international partners changes. Instead of designing solutions elsewhere, they support solutions led from within. Instead of short project cycles, they commit to relationships. Instead of extracting value, they share it." },
        { type: "quote", text: "Africa is not a place that needs saving. It is where much of the future is being built." },
        { type: "h2", text: "Why Kenya" },
        { type: "p", text: "GIA's African hub is in Kenya, a centre of innovation and conservation and home to the global headquarters of the UN Environment Programme and UN-Habitat. From there, we are building partnerships across East Africa and beyond, with African leaders and communities setting the priorities." },
        { type: "p", text: "Africa's role in shaping the future is not a question of if, but of how. We want to help make sure that future is shaped with African knowledge and leadership at its centre." },
      ],
    },
  ] as Article[],
};
