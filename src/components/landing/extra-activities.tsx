
'use client';

import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

export function ExtraActivities() {
  return (
    <SectionWrapper id="extra-activities" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle>Extra Technical Activities</SectionTitle>
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
             <CardHeader className="flex flex-row items-center gap-4 p-6">
                <BrainCircuit className="h-8 w-8 text-primary flex-shrink-0" />
                <CardTitle className="text-xl font-headline font-semibold">Full Stack AI Development Bootcamp</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <p className="text-foreground/80 leading-relaxed">
                Completed an intensive bootcamp focused on building end-to-end applications using modern web technologies and artificial intelligence tools, covering frontend and backend integration, API development, and the practical use of AI services in real-world applications, conducted by Aditya Majethia Sir and Kumar Majethia Sir.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
