'use client';

import { studentName } from '@/lib/data';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const firstName = studentName.split(' ')[0].toUpperCase();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo / Icon Area */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="p-4 rounded-3xl bg-primary/5 border border-primary/20 backdrop-blur-md">
            <Sparkles className="h-10 w-10 text-primary animate-pulse" />
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-primary/60 mb-2">Portfolio of</h2>
            <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter text-foreground">
              {firstName}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-primary"
              >
                .
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-4 text-lg text-muted-foreground font-medium italic"
          >
            Engineering the Future
          </motion.p>
        </div>

        {/* Professional Progress Bar */}
        <div className="w-64 h-[2px] bg-muted relative overflow-hidden rounded-full">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60"
        >
          Loading Assets {progress}%
        </motion.div>
      </div>

      {/* Subtle border framing */}
      <div className="absolute inset-4 border border-primary/5 pointer-events-none rounded-2xl" />
    </div>
  );
}
