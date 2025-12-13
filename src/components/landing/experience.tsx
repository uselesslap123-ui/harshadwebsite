
"use client";

import Link from 'next/link';
import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { experiences } from '@/lib/data';
import { Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function Experience() {
  const handleCardClick = (url: string | undefined) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <SectionWrapper id="experience" className="bg-background">
      <SectionTitle>Experience & Training</SectionTitle>
      <div className="relative max-w-3xl mx-auto">
        {/* The vertical line */}
        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

        {experiences.map((exp, index) => (
          <div key={index} className="relative mb-8 flex items-start md:items-center w-full">
            {/* Dot on the timeline */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
              <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg ring-4 ring-background">
                <Briefcase className="h-6 w-6" />
              </div>
            </div>

            {/* Empty div for spacing on one side (desktop) */}
            <div className={cn(
              "w-1/2 hidden md:block",
              index % 2 === 0 ? 'pr-8' : 'pl-8 order-2'
            )}></div>

            {/* Card Content */}
            <div className={cn(
              "w-full md:w-1/2 pl-12 md:pl-0",
              index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:text-right'
            )}>
              <Card 
                className={cn(
                  "shadow-lg",
                  exp.certificateUrl && "cursor-pointer hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300"
                )}
                onClick={() => handleCardClick(exp.certificateUrl)}
                role={exp.certificateUrl ? 'link' : 'listitem'}
                tabIndex={exp.certificateUrl ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(exp.certificateUrl);
                  }
                }}
              >
                <CardHeader className={index % 2 !== 0 ? 'md:items-end' : ''}>
                  <p className="text-sm text-muted-foreground">{exp.year} - {exp.company}</p>
                  <CardTitle className="text-lg">{exp.title}</CardTitle>
                  <CardDescription>{exp.description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
