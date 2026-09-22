import type { Dictionary } from "@/i18n";
import { ProjectStory } from "./cards";
import { Figure } from "./Figure";
import { Meta } from "./ui";

type Project = Dictionary["impact"]["projects"][number];

/** A full project story in GIA's format: Challenge, Approach, Partnership, Action, Impact. */
export function ProjectCase({ project, labels, imageAlt }: { project: Project; labels: Dictionary["common"]; imageAlt?: string }) {
  return (
    <article id={project.id} className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      {/* Without a photo the title spans the row, so no empty column sits beside the story. */}
      <div className={`reveal ${project.image ? "lg:sticky lg:top-28 lg:col-span-5 lg:self-start" : "lg:col-span-12"}`}>
        <Meta>
          {project.status} · {project.place}
        </Meta>
        <h2 className="mt-3 max-w-[22ch] font-display text-[2rem] font-semibold leading-tight tracking-tight text-ink">{project.title}</h2>
        <p className="mt-2 text-small text-muted">{project.focus}</p>
        {project.image && (
          <Figure name={project.image} alt={imageAlt ?? ""} ratio="4/5" sizes="(min-width: 1024px) 26rem, 90vw" className="mt-8 max-w-[26rem]" />
        )}
      </div>
      <div className={project.image ? "lg:col-span-7" : "lg:col-span-7 lg:col-start-6"}>
        <ProjectStory project={project} labels={labels} />
      </div>
    </article>
  );
}
