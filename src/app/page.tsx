'use client';

import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Summary } from '@/components/landing/summary';
import { Skills } from '@/components/landing/skills';
import { Experience } from '@/components/landing/experience';
import { ExtraActivities } from '@/components/landing/extra-activities';
import { Projects } from '@/components/landing/projects';
import { Education } from '@/components/landing/education';
import { Contact } from '@/components/landing/contact';
import { Footer } from '@/components/landing/footer';
import { motion } from 'framer-motion';
import { AiChatAssistant } from '@/components/landing/ai-chat-assistant';
import { ScrollEndNotifier } from '@/components/shared/scroll-end-notifier';
import { useState } from 'react';

export default function Home() {
  const [showChat, setShowChat] = useState(false);

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
          <ExtraActivities />
          <Projects />
          <Education />
          <Contact />
        </div>
        <ScrollEndNotifier onScrollEnd={() => setShowChat(true)} />
        <AiChatAssistant show={showChat} onHide={() => setShowChat(false)} />
      </main>
      <Footer />
    </motion.div>
  );
}
