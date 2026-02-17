
"use client";

import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { experiences } from '@/lib/data';
import { Briefcase, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleCardClick = (url: string | undefined) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <SectionWrapper id="experience" className="bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <SectionTitle>Experience & Training</SectionTitle>
            
            <div ref={containerRef} className="relative max-w-4xl mx-auto py-10 px-4 md:px-0">
                {/* The vertical line that draws as you scroll */}
                <div className="absolute left-6 md:left-1/2 top-0 h-full w-0.5 bg-muted -translate-x-1/2">
                  <motion.div 
                    style={{ scaleY, originY: 0 }}
                    className="h-full w-full bg-gradient-to-b from-primary via-accent to-primary"
                  />
                </div>

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                    <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                        className="relative flex items-center group"
                    >
                        {/* Dot on the timeline */}
                        <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                            <motion.div 
                                whileHover={{ scale: 1.3 }}
                                className="bg-background border-2 border-primary rounded-full p-2 md:p-2.5 shadow-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                            >
                                <Briefcase className="h-4 w-4 md:h-5 md:w-5" />
                            </motion.div>
                        </div>

                        {/* Card Content */}
                        <div className={cn(
                            "w-full pl-12 md:pl-0 md:w-[calc(50%-2.5rem)]",
                            index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                        )}>
                            <Card 
                                className={cn(
                                    "relative shadow-sm hover:shadow-2xl transition-all duration-500 border-primary/10 hover:border-primary/40 hover:-translate-y-1 md:hover:-translate-y-2 group/card overflow-hidden",
                                    exp.certificateUrl && "cursor-pointer"
                                )}
                                onClick={() => handleCardClick(exp.certificateUrl)}
                            >
                                <div className="absolute top-0 left-0 w-1 md:w-1.5 h-full bg-gradient-to-b from-primary to-accent" />
                                
                                <CardHeader className={cn("p-4 md:p-6", index % 2 !== 0 ? 'md:text-right' : '')}>
                                    <div className={cn("flex flex-col gap-1", index % 2 !== 0 ? 'md:items-end' : '')}>
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                                                {exp.year}
                                            </span>
                                            <span className="text-[10px] md:text-xs text-muted-foreground font-semibold">
                                                {exp.company}
                                            </span>
                                        </div>
                                        <CardTitle className="text-lg md:text-xl font-headline font-bold text-foreground group-hover/card:text-primary transition-colors">
                                            {exp.title}
                                        </CardTitle>
                                        <CardDescription className="text-muted-foreground/90 leading-relaxed mt-2 text-xs md:text-sm lg:text-base">
                                            {exp.description}
                                        </CardDescription>
                                        
                                        {exp.certificateUrl && (
                                            <div className="mt-3 md:mt-4 flex items-center gap-2 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300">
                                                View Credential 
                                                <ExternalLink className="h-3 w-3 md:h-3.5 md:w-3.5 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-transform" />
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
