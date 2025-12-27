
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
import { motion } from 'framer-motion';

function SkillDetailsDialog({ skill, open, onOpenChange }: { skill: Skill | null, open: boolean, onOpenChange: (open: boolean) => void }) {
  if (!skill || !skill.details) return null;

  // Simple markdown to HTML
  const formatDetails = (details: string) => {
    return details
      .replace(/`([^`]+)`/g, '<code class="bg-muted text-foreground/80 font-code px-1 py-0.5 rounded-sm">$1</code>')
      .split('\n')
      .map((line, index) => {
        line = line.trim();
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-primary">{line.substring(4)}</h3>;
        }
        if (line.startsWith('* ')) {
          const formattedLine = line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground/90">$1</strong>');
          return <li key={index} className="list-disc list-inside ml-4" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        }
        if (line) {
          const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground/90">$1</strong>');
          return <p key={index} className="my-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        }
        return null;
      })
      .filter(line => line !== null); 
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-4">
             <skill.icon className="h-10 w-10 text-primary flex-shrink-0" />
            <DialogTitle className="text-2xl font-headline">{skill.name}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert prose-headings:text-primary prose-strong:text-foreground overflow-y-auto pr-4">
          {formatDetails(skill.details)}
        </div>
      </DialogContent>
    </Dialog>
  );
}


export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const handleSkillClick = (skill: Skill) => {
    if (skill.details) {
      setSelectedSkill(skill);
    }
  };

  const contentForSkill = (skill: Skill, index: number) => {
    const isClickable = !!skill.url || !!skill.details;
    
    return (
      <Card 
        key={index}
        className={`group relative overflow-hidden hover:shadow-lg hover:-translate-y-1 active:shadow-2xl active:scale-95 transition-all duration-300 h-full ${isClickable ? 'cursor-pointer' : ''}`}
      >
        <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
          <skill.icon className="h-10 w-10 mb-4 text-primary group-hover:scale-110 transition-transform" />
          <p className="font-semibold text-sm md:text-base">{skill.name}</p>
        </CardContent>
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
