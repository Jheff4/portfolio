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
  description: "A playground of MVPs, SaaS experiments, and production apps.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className={s.pageContainer}>
      <div className={s.innerContainer}>
        <div className={s.header}>
          <h1 className={s.pageTitle}>Projects</h1>
          <p className={s.pageSubtitle}>
            Playground — Small MVPs to Production Apps
          </p>
        </div>

        <div className={s.projectsGrid}>
          {projects.map((project) => (
            <FollowerPointerCard
              key={project.slug}
              title={<TitleComponent title={project.author} />}
            >
              <div className={`${s.projectCard} relative`}>
                {/* Full-card clickable overlay to the detail page */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="absolute inset-0 z-0"
                  aria-label={`View ${project.title} details`}
                />
  
                {/* Thumbnail — pointer-events-none so the overlay link shows through */}
                <div className={`${s.imageContainer} relative z-10 pointer-events-none`}>
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
                </div>
  
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
