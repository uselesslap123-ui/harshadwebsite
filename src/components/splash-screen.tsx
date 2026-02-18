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
        return prev + 1.5;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden px-6">
      {/* Ultra-subtle background gradients */}
      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[160px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Minimal Icon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <Sparkles className="h-6 w-6 text-primary/40" />
        </motion.div>

        {/* Clean Typography */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h2 className="text-[10px] font-bold uppercase text-primary/50 tracking-[0.5em] mb-4">
              Portfolio
            </h2>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-headline font-light tracking-tight text-foreground"
          >
            {firstName}<span className="text-primary font-bold">.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xs text-muted-foreground/60 tracking-widest uppercase font-medium"
          >
            Electronics Engineer & Developer
          </motion.p>
        </div>

        {/* Cinematic Progress Bar */}
        <div className="w-full max-w-[200px] flex flex-col items-center gap-4">
          <div className="w-full h-[1px] bg-muted/30 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[8px] font-bold tracking-[0.3em] uppercase text-muted-foreground/40"
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      </div>
    </div>
  );
}
