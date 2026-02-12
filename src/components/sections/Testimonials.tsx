"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/lib/data";
import Card, { CardContent } from "../ui/Card";

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = siteData.testimonials;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-surface/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Hear what our clients have to say about their experience working with SuperSoft.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card glass className="p-8 md:p-12">
            <CardContent>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-violet-600 rounded-full flex items-center justify-center text-3xl text-white font-bold">
                    {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating */}
                  <div className="flex justify-center md:justify-start mb-4">
                    {Array.from({ length: testimonials[currentTestimonial].rating }, (_, i) => (
                      <span key={i} className="text-2xl text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl text-foreground-secondary mb-6 italic">
                    &ldquo;{testimonials[currentTestimonial].content}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div>
                    <div className="font-semibold text-foreground text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-foreground-secondary">
                      {testimonials[currentTestimonial].position} at{" "}
                      <span className="text-primary">{testimonials[currentTestimonial].company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full glass hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          
          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index
                    ? "bg-primary w-8"
                    : "bg-foreground-secondary hover:bg-foreground-secondary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full glass hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToTestimonial(index)}
              className={`p-4 rounded-xl glass hover:scale-105 transform transition-all duration-300 text-left ${
                currentTestimonial === index ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/50 to-violet-600/50 rounded-full flex items-center justify-center text-sm text-white font-bold flex-shrink-0">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-foreground text-sm truncate">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-foreground-secondary truncate">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;