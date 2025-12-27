'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { summary, studentName } from '@/lib/data';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WallEIcon } from '@/components/shared/icons';

export function Hero() {
  const [isGreetingVisible, setIsGreetingVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGreetingVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
            alt="Semiconductor background"
            fill
            className="object-cover"
            priority
            data-ai-hint="semiconductor circuit"
        />
        <div className="absolute inset-0 bg-black/70" />
      <div className="container mx-auto px-4 grid grid-cols-1 items-center relative z-10">
        <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AnimatePresence>
            {isGreetingVisible && (
              <motion.div 
                className="flex items-center justify-center gap-2 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div
                  animate={{ rotate: [0, 20, -15, 10, 0] }}
                  transition={{ duration: 1.5, repeat: 2, ease: "easeInOut" }}
                >
                  <WallEIcon className="h-8 w-8 text-primary" />
                </motion.div>
                <p className="text-xl font-medium text-slate-200">HELLO !!</p>
              </motion.div>
            )}
          </AnimatePresence>
            <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight cursor-pointer text-white drop-shadow-lg"
                whileTap={{ scale: 0.95, rotate: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                Hi, I'm{' '}
                <motion.span 
                    className="text-primary"
                    whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {studentName.split(' ')[0]}
                </motion.span>
            </motion.h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl md:text-2xl text-slate-300 italic drop-shadow-md">
                {summary.inspiring_quote}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                <Link href="#projects">
                View My Work
                <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                </Link>
            </Button>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
