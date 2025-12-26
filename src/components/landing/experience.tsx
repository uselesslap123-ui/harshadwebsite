
"use client";

import Link from 'next/link';
import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { experiences } from '@/lib/data';
import { Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Experience() {
  const handleCardClick = (url: string | undefined) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <SectionWrapper id="experience" className="bg-background">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
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
                                "w-full ml-14 md:ml-0 md:w-[calc(50%-2rem)] shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1.5",
                                exp.certificateUrl && "cursor-pointer",
                                index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto md:text-right'
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
                    ))}
                </div>
            </div>
      </motion.div>
    </SectionWrapper>
  );
}
