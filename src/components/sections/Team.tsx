"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import { siteData } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const avatarGradients = [
  "from-teal-400 to-cyan-500",
  "from-amber-400 to-orange-500",
  "from-cyan-400 to-blue-500",
  "from-amber-500 to-red-500",
];

const Team: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="team" className="relative bg-surface py-[100px]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          label="The Team"
          title="Meet Our Leadership"
          gradientWord="Leadership"
          description="Talented engineers, designers, and strategists passionate about building exceptional software."
          align="center"
        />

        {/* Team Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5 mb-12"
        >
          {siteData.team.map((member, index) => (
            <div
              key={member.id}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "p-8 rounded-2xl border text-center transition-all duration-250",
                hoveredId === member.id
                  ? "bg-primary/[0.06] border-primary/25 translate-y-[-4px]"
                  : "bg-white/[0.02] border-white/[0.06]"
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-5 font-display font-extrabold text-2xl text-white transition-transform duration-250",
                  avatarGradients[index % avatarGradients.length],
                  hoveredId === member.id && "scale-105"
                )}
              >
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>

              {/* Name & Title */}
              <h3 className="font-display text-base font-bold tracking-tight text-foreground mb-1">
                {member.name}
              </h3>
              <p className="font-sans text-xs font-semibold text-primary mb-3 tracking-wide">
                {member.position}
              </p>
              <p className="font-sans text-xs text-foreground-muted leading-relaxed mb-5">
                {member.bio}
              </p>

              {/* Social */}
              <div className="flex gap-2 justify-center">
                {[
                  { href: member.linkedin, Icon: Linkedin, label: "LinkedIn" },
                  { href: member.twitter, Icon: Twitter, label: "Twitter" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-foreground-muted no-underline transition-all duration-200 hover:bg-primary/15 hover:border-primary/30 hover:text-primary"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-12 rounded-2xl bg-primary/[0.05] border border-primary/15 text-center"
        >
          <h3 className="font-display text-2xl font-bold text-foreground tracking-tight mb-3">
            Want to Join Our Team?
          </h3>
          <p className="font-sans text-sm text-foreground-muted max-w-[440px] mx-auto mb-7">
            We&apos;re always looking for talented individuals passionate about
            technology and innovation.
          </p>
          <Button
            variant="outline"
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Open Positions &rarr;
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
