'use client';

import Link from 'next/link';
import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import { education } from '@/lib/data';
import { GraduationCap, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BVCOELogo } from '@/components/shared/icons';

export function Education() {
  return (
    <SectionWrapper id="education" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle>Education</SectionTitle>
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1.5">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-shrink-0 w-full sm:w-1/3 bg-primary/5 flex items-center justify-center p-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <BVCOELogo className="h-24 w-24 text-primary" />
                </motion.div>
              </div>
              <CardContent className="p-6 flex-grow">
                <div className="flex items-start gap-3 mb-2">
                  <GraduationCap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <h3 className="text-xl font-headline font-semibold">{education.degree}</h3>
                </div>
                <div className="pl-0 sm:pl-9 space-y-2">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileInView={{ 
                      scale: [1, 1.03, 1],
                      transition: { 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        ease: "easeInOut"
                      } 
                    }}
                    className="inline-block"
                  >
                    <Link 
                      href="https://bvcoenm.edu.in/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <span>{education.university}</span>
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="text-primary hidden sm:flex items-center"
                      >
                        <MousePointer2 className="h-4 w-4 animate-bounce" />
                        <span className="text-xs font-bold ml-1 opacity-0 group-hover:opacity-100 transition-opacity">Visit Site</span>
                      </motion.span>
                    </Link>
                  </motion.div>
                  <p className="font-semibold text-primary">{education.years}</p>
                  <p className="text-sm text-foreground/70 italic">{education.status}</p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
