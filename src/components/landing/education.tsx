
'use client';

import Link from 'next/link';
import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import { education } from '@/lib/data';
import { GraduationCap } from 'lucide-react';
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
                <div className="pl-9 space-y-2">
                  <Link href="https://bvcoenm.edu.in/" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                    {education.university}
                  </Link>
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
