// Tools page — Server Component.
// CometCard is "use client" but it's a leaf — importing it here is fine.
// The server renders the grid HTML; only CometCard's 3D tilt effect is hydrated.
import Image from "next/image";
import { CometCard } from "@/components/ui/comet-card";
import { toolsPageStyles as s } from "@/lib/styles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shovels",
  description: "Tools I frequently use to make life easier.",
};

interface Tool {
  name: string;
  category: string;
  icon: string;
  href: string;
}

const tools: Tool[] = [
  { name: "Cursor", category: "IDE", icon: "/cursor.webp", href: "https://cursor.sh" },
  { name: "Claude AI", category: "Productivity", icon: "/claude.webp", href: "https://claude.ai" },
  { name: "ChatGPT", category: "Productivity", icon: "/chatgpt.webp", href: "https://chat.openai.com" },
  { name: "Notion", category: "Productivity", icon: "/notion.webp", href: "https://notion.so" },
  { name: "VS Code", category: "IDE", icon: "/vscode.webp", href: "https://code.visualstudio.com" },
  { name: "PyCharm", category: "IDE", icon: "/pycharm.webp", href: "https://jetbrains.com/pycharm" },
  { name: "Windsurf", category: "IDE", icon: "/windsurf.webp", href: "https://codeium.com/windsurf" },
  { name: "Perplexity", category: "Research", icon: "/perplexity.webp", href: "https://perplexity.ai" },
  { name: "Hugging Face", category: "AI Platform", icon: "/huggingface.webp", href: "https://huggingface.co" },
  { name: "Gemini", category: "Productivity", icon: "/gemini.webp", href: "https://gemini.google.com" },
  { name: "Slack", category: "Communication", icon: "/slack.webp", href: "https://slack.com" },
  { name: "Medium", category: "Writing", icon: "/medium.webp", href: "https://medium.com" },
  { name: "Lovable", category: "Productivity", icon: "/lovable.webp", href: "https://lovable.dev" },
  { name: "Android Studio", category: "IDE", icon: "/android.webp", href: "https://developer.android.com/studio" },
];

export default function ToolsPage() {
  return (
    <div className={s.pageContainer}>
      <div className={s.contentContainer}>

        <div className={s.headerContainer}>
          <h1 className={s.headerTitle}>Shovels</h1>
          <p className={s.headerSubtitle}>
            Tools I frequently use to make life easier
          </p>
        </div>

        {/*
          Why CometCard per tool?
          The 3D tilt + glare is a Framer Motion spring driven by mouse position.
          It makes each card feel physical on hover. The spring smoothing means
          it never snaps — it always eases back to rest.
          CometCard is a leaf "use client" — its JS cost is isolated here.
        */}
        <div className={s.toolsGrid}>
          {tools.map((tool) => (
            <CometCard key={tool.name}>
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className={s.toolCardLink}
              >
                <div className={s.toolIconContainer}>
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={48}
                    height={48}
                    className={s.toolIcon}
                  />
                </div>
                <div className={s.toolTextContainer}>
                  <p className={s.toolName}>{tool.name}</p>
                  <p className={s.toolCategory}>{tool.category}</p>
                </div>
              </a>
            </CometCard>
          ))}
        </div>

      </div>
    </div>
  );
}
