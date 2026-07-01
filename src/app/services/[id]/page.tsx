import { notFound } from "next/navigation";
import Link from "next/link";
import { siteData } from "@/lib/data";

export async function generateStaticParams() {
  return siteData.services.map((service) => ({ id: String(service.id) }));
}

export default async function ServicePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const service = siteData.services.find((s) => s.id === Number(id));
  if (!service) notFound();

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
        <div className="max-w-[800px] mx-auto px-6 py-20">
          <Link href="/#services" className="inline-flex items-center gap-1.5 font-sans text-sm text-foreground-muted no-underline hover:text-primary transition-colors mb-8">
            &larr; Back to Services
          </Link>

          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center mb-6">
            {service.icon}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight text-foreground mb-4">
            {service.title}
          </h1>
          <p className="font-sans text-base text-foreground-muted leading-relaxed mb-10 max-w-[600px]">
            {service.description}
          </p>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">Technologies We Use</h2>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <span key={tech} className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] font-sans text-sm text-foreground-muted">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">What We Deliver</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-xs text-primary flex-shrink-0">&check;</span>
                  <span className="font-sans text-sm text-foreground-secondary">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl bg-primary/[0.06] border border-primary/20 text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Need {service.title} Services?</h3>
            <p className="font-sans text-sm text-foreground-muted mb-6 max-w-[400px] mx-auto">
              Let&apos;s discuss how we can help you build something great.
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

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-surface py-8">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          <p className="font-sans text-xs text-foreground-muted/60">&copy; {new Date().getFullYear()} {siteData.company.name}. All rights reserved.</p>
          <Link href="/" className="font-sans text-xs text-foreground-muted no-underline hover:text-foreground-secondary transition-colors">Home</Link>
        </div>
      </footer>
    </div>
  );
}
