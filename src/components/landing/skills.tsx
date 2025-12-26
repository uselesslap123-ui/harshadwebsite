
'use client';

import Link from 'next/link';
import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import { skills, type Skill } from '@/lib/data';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';

function SkillDetailsDialog({ skill, open, onOpenChange }: { skill: Skill | null, open: boolean, onOpenChange: (open: boolean) => void }) {
  if (!skill || !skill.details) return null;

  // Simple markdown to HTML
  const formatDetails = (details: string) => {
    return details
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-primary">{line.substring(4)}</h3>;
        }
        if (line.startsWith('* ')) {
          const formattedLine = line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground/90">$1</strong>');
          return <li key={index} className="list-disc list-inside" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        }
        return <p key={index}>{line}</p>;
      })
      .filter(line => (line as React.ReactElement).props.children); // filter out empty paragraphs
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
             <skill.icon className="h-10 w-10 text-primary" />
            <DialogTitle className="text-2xl font-headline">{skill.name}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          {formatDetails(skill.details)}
        </div>
      </DialogContent>
    </Dialog>
  );
}


export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [animatingSkill, setAnimatingSkill] = useState<string | null>(null);

  const handleSkillClick = (skill: Skill) => {
    if (skill.details) {
      setSelectedSkill(skill);
    }
  };

  const handlePhotographyClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    setAnimatingSkill("Photography");
    setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
        setAnimatingSkill(null);
    }, 800); // Duration of the animation
  };

  const contentForSkill = (skill: Skill, index: number) => {
    const isClickable = !!skill.url || !!skill.details;
    const isAnimating = animatingSkill === skill.name;
    
    return (
      <Card 
        key={index}
        className={`group relative overflow-hidden hover:shadow-lg hover:-translate-y-1 active:shadow-2xl active:scale-95 transition-all duration-300 h-full ${isClickable ? 'cursor-pointer' : ''}`}
      >
        <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
          <skill.icon className="h-10 w-10 mb-4 text-primary group-hover:scale-110 transition-transform" />
          <p className="font-semibold text-sm md:text-base">{skill.name}</p>
        </CardContent>

        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="absolute inset-0 bg-white/80 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.1 } }}
              exit={{ opacity: 0, transition: { delay: 0.6, duration: 0.1 } }}
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -15 }}
                animate={{ scale: [1, 1.2, 1], rotate: 0, transition: { duration: 0.4, ease: "backOut" } }}
              >
                <skill.icon className="h-20 w-20 text-primary" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], transition: { times: [0, 0.1, 1], duration: 0.5, delay: 0.2 } }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    );
  }

  return (
    <SectionWrapper id="skills" className="bg-card">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            <SectionTitle>My Skillset</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
                {skills.map((skill, index) => {
                if (skill.url) {
                    if (skill.name === "Photography") {
                        return (
                             <div key={`link-${index}`} onClick={(e) => handlePhotographyClick(e, skill.url!)} className="block h-full">
                                {contentForSkill(skill, index)}
                             </div>
                        )
                    }
                    return (
                        <Link key={`link-${index}`} href={skill.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                            {contentForSkill(skill, index)}
                        </Link>
                    );
                }
                // Handle non-URL skills
                return (
                    <div key={index} onClick={() => handleSkillClick(skill)} className="block h-full">
                        {contentForSkill(skill, index)}
                    </div>
                );
                })}
            </div>
        </motion.div>
        <SkillDetailsDialog 
            skill={selectedSkill}
            open={!!selectedSkill}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                setSelectedSkill(null);
                }
            }}
        />
    </SectionWrapper>
  );
}
