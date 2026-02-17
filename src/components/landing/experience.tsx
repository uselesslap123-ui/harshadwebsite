
"use client";

import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { experiences } from '@/lib/data';
import { Briefcase, ExternalLink } from 'lucide-react';
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
    <SectionWrapper id="experience" className="bg-background relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <SectionTitle>Experience & Training</SectionTitle>
            
            <div className="relative max-w-4xl mx-auto py-10 px-4">
                {/* The vertical line */}
                <div className="absolute left-6 md:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 -translate-x-1/2 hidden sm:block" />

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                    <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative flex items-center group"
                    >
                        {/* Dot on the timeline */}
                        <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 hidden sm:block">
                            <motion.div 
                                whileHover={{ scale: 1.2 }}
                                className="bg-background border-2 border-primary rounded-full p-2.5 shadow-xl ring-4 ring-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                            >
                                <Briefcase className="h-5 w-5" />
                            </motion.div>
                        </div>

                        {/* Card Content */}
                        <div className={cn(
                            "w-full sm:w-[calc(50%-2.5rem)]",
                            index % 2 === 0 ? 'sm:mr-auto' : 'sm:ml-auto'
                        )}>
                            <Card 
                                className={cn(
                                    "relative shadow-sm hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 hover:-translate-y-2 group/card overflow-hidden",
                                    exp.certificateUrl && "cursor-pointer"
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
                                {/* Decorative gradient accent */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                
                                <CardHeader className={cn("p-6", index % 2 !== 0 ? 'sm:text-right' : '')}>
                                    <div className={cn("flex flex-col gap-1", index % 2 !== 0 ? 'sm:items-end' : '')}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                {exp.year}
                                            </span>
                                            <span className="text-xs text-muted-foreground font-medium">
                                                {exp.company}
                                            </span>
                                        </div>
                                        <CardTitle className="text-xl font-headline font-bold text-foreground">
                                            {exp.title}
                                        </CardTitle>
                                        <CardDescription className="text-muted-foreground/90 leading-relaxed mt-2 text-sm sm:text-base">
                                            {exp.description}
                                        </CardDescription>
                                        
                                        {exp.certificateUrl && (
                                            <div className="mt-4 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                                View Credential <ExternalLink className="h-3.5 w-3.5" />
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                            </Card>
                        </div>
                    </motion.div>
                    ))}
                </div>
            </div>
      </motion.div>
    </SectionWrapper>
  );
}
