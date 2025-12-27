
'use client';

import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { summary } from '@/lib/data';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

const AnimatedText = ({ text }: { text: string }) => {
  const roboticsUrl = "https://www.instagram.com/robonauts_team?igsh=MTk0d3hyOXJkbDl2Zw==";
  const words = text.split(' ');
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.p
      ref={ref}
      className="text-xl md:text-2xl text-foreground/80 leading-relaxed"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => {
        const isRoboticsClub = word.includes("Robotics");
        const nextWordIsClub = words[index + 1] === "Club,";
        
        if (isRoboticsClub && nextWordIsClub) {
          return (
            <motion.span key={index} variants={wordVariants} className="inline-block">
              <Link
                href={roboticsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-colors duration-200 font-semibold"
              >
                Robotics Club
              </Link>
              {', '}
            </motion.span>
          );
        }
        
        if (word === "Club,") {
          const prevWordIsRobotics = words[index - 1] === "Robotics";
          if (prevWordIsRobotics) return null; // Already handled
        }

        return (
          <motion.span key={index} variants={wordVariants} className="inline-block">
            {word}{' '}
          </motion.span>
        );
      })}
    </motion.p>
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
