
'use client';

import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { summary } from '@/lib/data';
import { motion } from 'framer-motion';

const AnimatedText = ({ text }: { text: string }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto text-center"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
        {words.map((word, index) => (
          <motion.span
            variants={child}
            key={index}
            style={{ marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
};


export function Summary() {
  return (
    <SectionWrapper id="summary" className="bg-background">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            <SectionTitle>About Me</SectionTitle>
            <AnimatedText text={summary.description} />
        </motion.div>
    </SectionWrapper>
  );
}
