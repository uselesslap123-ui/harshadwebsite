
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
          return <li key={index} className="list-disc list-inside ml-4 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        }
        if (line) {
          const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground/90">$1</strong>');
          return <p key={index} className="my-2 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        }
        return null;
      })
      .filter(line => line !== null); 
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95vw] md:w-full max-h-[90vh] flex flex-col p-4 md:p-6 rounded-xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
             <skill.icon className="h-8 w-8 md:h-10 md:w-10 text-primary flex-shrink-0" />
            <DialogTitle className="text-xl md:text-2xl font-headline">{skill.name}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert overflow-y-auto pr-2 mt-4">
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const contentForSkill = (skill: Skill) => {
    const isClickable = !!skill.url || !!skill.details;
    
    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ 
            scale: 1.05, 
            y: -5,
            transition: { duration: 0.2 } 
        }}
        whileTap={{ scale: 0.95 }}
        className="h-full"
      >
        <Card 
            className={`group relative overflow-hidden shadow-sm hover:shadow-xl border-primary/5 hover:border-primary/20 transition-all duration-300 h-full bg-background/50 backdrop-blur-sm ${isClickable ? 'cursor-pointer' : ''}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="flex flex-col items-center justify-center p-4 md:p-6 text-center h-full relative z-10">
                <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-3 md:mb-4">
                    <skill.icon className="h-6 w-6 md:h-8 md:w-8 group-hover:scale-110 transition-transform" />
                </div>
                <p className="font-bold text-xs md:text-sm lg:text-base tracking-tight">{skill.name}</p>
                {isClickable && (
                    <div className="mt-2 w-0 group-hover:w-8 h-0.5 bg-primary transition-all duration-300" />
                )}
            </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <SectionWrapper id="skills" className="bg-card relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-10"
        >
            <SectionTitle>My Skillset</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 max-w-5xl mx-auto">
                {skills.map((skill, index) => {
                if (skill.url) {
                    return (
                        <Link key={`link-${index}`} href={skill.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                            {contentForSkill(skill)}
                        </Link>
                    );
                }
                return (
                    <div key={index} onClick={() => handleSkillClick(skill)} className="block h-full">
                        {contentForSkill(skill)}
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
