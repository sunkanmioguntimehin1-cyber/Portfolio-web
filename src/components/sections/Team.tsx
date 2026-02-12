"use client";

import React from "react";
import { Linkedin, Twitter } from "lucide-react";
import { siteData } from "@/lib/data";
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-gradient-to-b from-surface/50 to-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our <span className="gradient-text">Leadership</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Our talented team of engineers, designers, and strategists are passionate about building exceptional software solutions.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {siteData.team.map((member, index) => (
            <Card
              key={member.id}
              hover
              glass
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-violet-600 rounded-2xl flex items-center justify-center text-3xl text-white font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="text-primary font-medium">
                  {member.position}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-foreground-secondary mb-4">
                  {member.bio}
                </p>
                
                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a
                    href={member.linkedin}
                    className="w-8 h-8 bg-surface-light rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.twitter}
                    className="w-8 h-8 bg-surface-light rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label={`${member.name} Twitter`}
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl gradient-border">
            <div className="bg-surface rounded-xl p-8">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Want to Join Our Team?
              </h3>
              <p className="text-foreground-secondary mb-6">
                We&apos;re always looking for talented individuals who are passionate about technology and innovation.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-violet-600 text-white font-medium rounded-xl hover:shadow-glow hover:scale-105 transform transition-all duration-300"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;