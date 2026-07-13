// Project detail page — Server Component with static generation.
// generateStaticParams tells Next.js to pre-render one HTML file per project
// at build time. Result: every /projects/[slug] route is pure static HTML,
// no server needed at request time, served from CDN.
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects-data";
import { projectDetailStyles as s } from "@/lib/styles";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// generateStaticParams — runs at BUILD time.
// Returns the list of slug values to pre-render.
// Any slug not in this list → 404 (notFound()).
export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className={s.pageContainer}>
      <div className={s.innerContainer}>

        {/* Back button */}
        <Link href="/projects" className={`${s.backButton} mb-8 inline-flex`}>
          <svg className={s.backIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>

        {/* Header */}
        <div className={s.projectHeader}>
          <div className={s.headerFlex}>
            <div className={s.headerLeft}>
              <div className={s.titleContainer}>
                <h1 className={s.projectTitle}>{project.title}</h1>
                <span
                  className={`${s.statusBadge} ${
                    project.status === "active" ? s.statusActive : s.statusInactive
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className={s.projectDescription}>{project.description}</p>
              <div className={s.tagsContainer}>
                {project.tags.map((tag) => (
                  <span key={tag} className={s.tag}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className={s.actionButtonsContainer}>
              {project.links.visit && (
                <a
                  href={project.links.visit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.visitButton}
                >
                  <svg className={s.buttonIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Live
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.secondaryButton}
                >
                  <svg className={s.buttonIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className={s.imageContainer}>
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
            className={s.projectImage}
            priority
          />
        </div>

        {/* Main content + sidebar */}
        <div className={s.gridContainer}>
          <div className={s.mainContent}>

            {/* Detailed description */}
            <section>
              <h2 className={s.sectionTitle}>Overview</h2>
              <p className={s.proseText}>{project.detailedDescription}</p>
            </section>

            {/* Features */}
            {project.features.length > 0 && (
              <section>
                <h2 className={s.sectionTitle}>Features</h2>
                <div className={s.featuresGrid}>
                  {project.features.map((feature) => (
                    <div key={feature} className={s.featureCard}>
                      <div className={s.featureCardInner}>
                        <div className={s.featureIconContainer}>
                          <div className={s.featureIcon} />
                        </div>
                        <p className={s.featureText}>{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Learning outcomes */}
            {project.learningOutcomes.length > 0 && (
              <section>
                <h2 className={s.sectionTitle}>What I Learned</h2>
                <div className={s.learningOutcomesGrid}>
                  {project.learningOutcomes.map((outcome, i) => (
                    <div key={outcome} className={s.learningOutcomeCard}>
                      <div className={s.learningOutcomeNumber}>
                        <span className={s.learningOutcomeNumberText}>{i + 1}</span>
                      </div>
                      <p className={s.learningOutcomeText}>{outcome}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar */}
          <div className={s.sidebar}>

            {/* Tech stack */}
            <div className={s.sidebarSection}>
              <h3 className={s.sidebarSectionTitle}>Tech Stack</h3>
              <div className={s.techStackContainer}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={s.techStackItem}>{tech}</span>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div className={s.sidebarSection}>
              <h3 className={s.sidebarSectionTitle}>Project Links</h3>
              <div className={s.linksContainer}>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.linkCard}
                  >
                    <svg className={s.linkIcon} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className={s.linkText}>View Source Code</span>
                  </a>
                )}
                {project.links.visit && (
                  <a
                    href={project.links.visit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.linkCard}
                  >
                    <svg className={s.linkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className={s.linkText}>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className={s.sidebarSection}>
              <h3 className={s.sidebarSectionTitle}>Project Info</h3>
              <div className={s.projectInfoContainer}>
                <div>
                  <p className={s.projectInfoLabel}>Author</p>
                  <p className={s.authorName}>{project.author}</p>
                </div>
                <div>
                  <p className={s.projectInfoLabel}>Status</p>
                  <p className={s.projectInfoText}>{project.status}</p>
                </div>
                <div>
                  <p className={s.projectInfoLabel}>Category</p>
                  <p className={s.projectInfoText}>{project.tags[0]}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
