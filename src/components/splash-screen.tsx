
'use client';

import { studentName } from '@/lib/data';
import { motion } from 'framer-motion';

export function SplashScreen() {
  return (
    <div className="relative flex items-center justify-center h-screen text-foreground overflow-hidden">
      <div className="absolute inset-0 z-0 animated-bg" />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="text-center z-10"
      >
        <motion.h1 
          className="text-3xl md:text-5xl font-headline font-bold text-primary drop-shadow-md"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {`Hello, I'm ${studentName.split(' ')[0]}`}
        </motion.h1>
        <p className="mt-2 text-lg md:text-xl text-muted-foreground">Welcome to my portfolio</p>
      </motion.div>
    </div>
  );
}
