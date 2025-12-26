
'use client';

import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { summary } from '@/lib/data';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AnimatedText = ({ text }: { text: string }) => {
  const roboticsUrl = "https://www.instagram.com/robonauts_team?igsh=MTk0d3hyOXJkbDl2Zw==";
  const parts = text.split(/(Robotics Club)/g);

  return (
    <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
        {parts.map((part, index) => {
          if (part === "Robotics Club") {
            return (
              <Link
                key={index}
                href={roboticsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-colors duration-200 font-semibold"
              >
                {part}
              </Link>
            );
          }
          return part;
        })}
      </p>
  );
};


export function Summary() {
  return (
    <SectionWrapper id="summary" className="bg-background">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center"
        >
            <SectionTitle>About Me</SectionTitle>
            <AnimatedText text={summary.description} />
        </motion.div>
    </SectionWrapper>
  );
}
