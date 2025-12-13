
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
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
        {experiences.map((exp, index) => (
          <div key={index} className="relative mb-8 flex items-center justify-between w-full">
            <div className={`order-1 w-5/12 ${index % 2 === 0 ? 'md:hidden' : 'hidden'}`}></div>
            <div className="z-10 flex items-center justify-center order-1 bg-primary text-primary-foreground shadow-xl w-12 h-12 rounded-full">
              <Briefcase className="h-6 w-6" />
            </div>
            <Card 
              className={cn(
                "order-1 w-full md:w-5/12 shadow-lg",
                index % 2 === 0 ? 'md:text-left' : 'md:text-right md:ml-auto',
                exp.certificateUrl && "cursor-pointer hover:shadow-primary/20 hover:border-primary/50"
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
              <CardHeader>
                <p className="text-sm text-muted-foreground">{exp.year} - {exp.company}</p>
                <CardTitle className="text-lg">{exp.title}</CardTitle>
                <CardDescription>{exp.description}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
