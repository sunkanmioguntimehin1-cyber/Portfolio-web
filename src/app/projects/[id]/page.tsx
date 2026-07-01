import { notFound } from "next/navigation";
import Link from "next/link";
import { siteData } from "@/lib/data";

const CATEGORY_COLORS: Record<string, string> = {
  Automotive: "#2DD4BF", "Safety & IoT": "#F59E0B", Enterprise: "#0EA5E9",
  Healthcare: "#14B8A6", Aviation: "#6366F1", Government: "#8B5CF6",
  Telecom: "#06B6D4", Education: "#F97316",
};

export function generateStaticParams() {
  return siteData.portfolio.map((project) => ({ id: String(project.id) }));
}

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const project = siteData.portfolio.find((p) => p.id === Number(id));
  if (!project) notFound();

  const color = CATEGORY_COLORS[project.category] || "#2DD4BF";

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/92 backdrop-blur-xl border-b border-white/[0.06]">
        <nav className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-[10px] flex items-center justify-center font-display font-bold text-base text-white">S</div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight">{siteData.company.name}</span>
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2.5 rounded-[10px] bg-gradient-to-r from-teal-400 to-cyan-500 font-sans text-sm font-semibold text-white no-underline shadow-[0_4px_16px_rgba(45,212,191,0.3)] hover:shadow-[0_8px_24px_rgba(45,212,191,0.45)] transition-all"
          >
            Let&apos;s Talk
          </Link>
        </nav>
      </div>

      <main className="pt-[120px]">
        <div className="max-w-[900px] mx-auto px-6 py-16">
          <Link href="/#portfolio" className="inline-flex items-center gap-1.5 font-sans text-sm text-foreground-muted no-underline hover:text-primary transition-colors mb-10">
            &larr; Back to Portfolio
          </Link>

          {/* Hero area */}
          <div className="rounded-2xl overflow-hidden border border-white/[0.07] mb-10">
            <div
              className="h-64 flex items-center justify-between px-10 relative"
              style={{ background: `linear-gradient(135deg, ${color}18 0%, rgba(14,165,233,0.1) 100%)` }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:24px_24px]" />
              <span className="text-7xl relative">{project.category === "Automotive" ? "🚗" : project.category === "Aviation" ? "✈️" : "📦"}</span>
              <div className="text-right relative">
                <div className="font-sans text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Client</div>
                <div className="font-display text-lg font-bold text-foreground">{project.client}</div>
              </div>
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
              />
            </div>

            <div className="p-8 md:p-10 bg-surface">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
                  style={{
                    background: `${color}18`, borderColor: `${color}30`, color,
                  }}
                >
                  {project.category}
                </span>
                <div className="flex gap-1.5">
                  {project.platforms?.slice(0, 4).map((p: string) => (
                    <span key={p} className="px-2 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] font-sans text-[10px] text-foreground-muted">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tighter leading-tight text-foreground mb-1">
                {project.title}
              </h1>
              <p className="font-sans text-base font-semibold mb-5" style={{ color }}>
                {project.subtitle}
              </p>
              <p className="font-sans text-sm text-foreground-secondary leading-relaxed max-w-[700px]">
                {project.description}
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-12">
            <h2 className="font-display text-lg font-bold text-foreground mb-5">Key Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((h: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                    style={{ background: `${color}20`, color }}
                  >&check;</span>
                  <span className="font-sans text-sm text-foreground-secondary">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] font-sans text-sm text-foreground-muted">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl bg-primary/[0.06] border border-primary/20 text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Want something similar built?</h3>
            <p className="font-sans text-sm text-foreground-muted mb-6 max-w-[400px] mx-auto">
              Let&apos;s discuss how we can help bring your project to life.
            </p>
            <Link
              href="/#contact"
              className="inline-flex px-6 py-3 rounded-[10px] bg-gradient-to-r from-teal-400 to-cyan-500 font-sans text-sm font-semibold text-white no-underline shadow-[0_8px_24px_rgba(45,212,191,0.35)] hover:shadow-[0_12px_32px_rgba(45,212,191,0.5)] transition-all"
            >
              Start Your Project &rarr;
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] bg-surface py-8">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          <p className="font-sans text-xs text-foreground-muted/60">&copy; {new Date().getFullYear()} {siteData.company.name}. All rights reserved.</p>
          <Link href="/" className="font-sans text-xs text-foreground-muted no-underline hover:text-foreground-secondary transition-colors">Home</Link>
        </div>
      </footer>
    </div>
  );
}
