
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

  const firstName = studentName.split(' ')[0];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-center">
        <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
            alt="Semiconductor background"
            fill
            className="object-cover scale-110"
            priority
            data-ai-hint="semiconductor circuit"
        />
        <div className="absolute inset-0 bg-black/75" />
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
          <AnimatePresence>
            {isGreetingVisible && (
              <motion.div 
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.5 } }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 25, -20, 15, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: 2, ease: "easeInOut" }}
                >
                  <WallEIcon className="h-10 w-10 text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                </motion.div>
                <p className="text-2xl font-bold text-slate-100 tracking-widest uppercase">Hello World</p>
              </motion.div>
            )}
          </AnimatePresence>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black leading-tight text-white drop-shadow-2xl">
                  Hi, I'm{' '}
                  <motion.span 
                      className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                      style={{ backgroundSize: '200% 200%' }}
                      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                      transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                  >
                      {firstName}
                  </motion.span>
              </h1>
              
              <motion.p 
                className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-slate-300 font-medium italic drop-shadow-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                  "{summary.inspiring_quote}"
              </motion.p>
              
              <motion.div 
                className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <Button asChild size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold text-lg group shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1">
                    <Link href="#projects">
                    Explore My Portfolio
                    <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-2" />
                    </Link>
                </Button>
              </motion.div>
            </motion.div>
        </motion.div>
      </div>
      
      {/* Animated background particles effect would go here if needed, 
          but keeping it simple with a slight parallax feel for now */}
    </section>
  );
}
