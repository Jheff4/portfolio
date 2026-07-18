import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects-data";
import { projectStyles as s } from "@/lib/styles";
import type { Metadata } from "next";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

const TitleComponent = ({ title }: { title: string }) => (
  <div className={s.titleComponentContainer}>
    <img src="/icon.svg" height={20} width={20} alt="EO" className={s.titleComponentAvatar} />
    <p className={s.titleComponentText}>{title}</p>
  </div>
);

export const metadata: Metadata = {
  title: "Projects",
  description: "Production systems, real users, and the engineering behind them.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className={s.pageContainer}>
      <div className={s.innerContainer}>
        <div className={s.header}>
          <h1 className={s.pageTitle}>Projects</h1>
          <p className={s.pageSubtitle}>
            Production systems, real users, and the engineering behind them
          </p>
        </div>

        <div className={s.projectsGrid}>
          {projects.map((project) => (
            <FollowerPointerCard
              key={project.slug}
              title={<TitleComponent title={project.author} />}
              className="[&_a]:cursor-none [&_button]:cursor-none"
            >
              <div className={`${s.projectCard} relative`}>
                {/* Thumbnail links to the detail page — only the image (and the
                    buttons below) are clickable, so the pointer only shows there */}
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`View ${project.title} details`}
                  className={`${s.imageContainer} relative z-10 block`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={s.projectImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className={s.statusBadgeContainer}>
                    <span
                      className={`${s.statusBadge} ${
                        project.status === "active" ? s.statusActive : s.statusInactive
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </Link>
  
                {/* Card content */}
                <div className={`${s.contentSection} relative z-10`}>
                  <h2 className={s.projectTitle}>{project.title}</h2>
                  <p className={s.projectDescription}>{project.description}</p>
  
                  <div className={s.tagsContainer}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={s.tag}>{tag}</span>
                    ))}
                  </div>
  
                  {/* Buttons at z-10 — their natural stacking captures clicks before the overlay */}
                  <div className={s.actionsContainer}>
                    <div className={s.actionsLinksContainer}>
                      {project.links.visit && (
                        <a
                          href={project.links.visit}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${s.visitButton} relative z-20`}
                        >
                          Visit
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${s.otherButton} relative z-20`}
                        >
                          GitHub
                        </a>
                      )}
                      {project.extraLinks?.map(({ label, url }) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${s.otherButton} relative z-20`}
                        >
                          {label}
                        </a>
                      ))}
                      {project.isPrivateRepo && (
                        <span className={`${s.privateTag} relative z-20`}>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          {project.privateRepoNote ? `Private · ${project.privateRepoNote}` : "Private Repo"}
                        </span>
                      )}
                      {project.links.pypi && (
                        <a
                          href={project.links.pypi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${s.otherButton} relative z-20`}
                        >
                          PyPI
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </FollowerPointerCard>
          ))}
        </div>
      </div>
    </div>
  );
}
