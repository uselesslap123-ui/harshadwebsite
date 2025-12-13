
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
      <div className="relative max-w-3xl mx-auto py-4">
        {/* The vertical line */}
        <div className="absolute left-5 top-0 h-full w-0.5 bg-border -translate-x-1/2 md:left-1/2"></div>

        <div className="space-y-8">
            {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-center group">
                {/* Dot on the timeline */}
                <div className="absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 md:left-1/2">
                <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg ring-4 ring-background">
                    <Briefcase className="h-6 w-6" />
                </div>
                </div>

                {/* Card Content */}
                <Card 
                    className={cn(
                        "w-full ml-14 md:ml-0 md:w-[calc(50%-2rem)] shadow-lg",
                        exp.certificateUrl && "cursor-pointer hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300",
                        index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto md:text-right'
                    )}
                    onClick={() => handleCardClick(exp.certificateUrl)}
                    role={exp.certificateUrl ? 'link' : 'listitem'}
                    tabIndex={exp.certificateUrl ? 0 : -1}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(exp.certificateur);
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
            ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
