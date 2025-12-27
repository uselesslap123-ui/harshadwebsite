'use client';

import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { summary } from '@/lib/data';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

const AnimatedText = ({ text }: { text: string }) => {
  const roboticsUrl = "https://www.instagram.com/robonauts_team?igsh=MTk0d3hyOXJkbDl2Zw==";
  
  // Custom renderer for the text to handle the link
  const renderText = () => {
    const parts = text.split(/(Robotics Club)/);
    return parts.map((part, index) => {
      if (part === "Robotics Club") {
        return (
          <Link
            key={index}
            href={roboticsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline transition-colors duration-200 font-semibold"
          >
            Robotics Club
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
      {renderText()}
    </p>
  );
};


export function Summary() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: false });

  return (
    <SectionWrapper id="summary" className="bg-background">
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center"
        >
            <SectionTitle>About Me</SectionTitle>
            <AnimatedText text={summary.description} />
        </motion.div>
    </SectionWrapper>
  );
}
