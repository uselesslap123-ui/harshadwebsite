
'use client';

import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { summary } from '@/lib/data';
import { motion } from 'framer-motion';

export function Summary() {
  return (
    <SectionWrapper id="summary" className="bg-background">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            <SectionTitle>About Me</SectionTitle>
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
                    {summary.description}
                </p>
            </div>
        </motion.div>
    </SectionWrapper>
  );
}
