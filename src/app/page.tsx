
'use client';

import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Summary } from '@/components/landing/summary';
import { Skills } from '@/components/landing/skills';
import { Experience } from '@/components/landing/experience';
import { Projects } from '@/components/landing/projects';
import { Education } from '@/components/landing/education';
import { Contact } from '@/components/landing/contact';
import { Footer } from '@/components/landing/footer';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col min-h-dvh bg-background text-foreground"
    >
      <Header />
      <main className="flex-grow relative">
        <Hero />
        <div className="relative z-10 bg-background">
          <Summary />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
