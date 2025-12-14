
'use client';

import { studentName } from '@/lib/data';
import { motion } from 'framer-motion';

export function SplashScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary">
          Hello! {studentName.split(' ')[0]} this side
        </h1>
      </motion.div>
    </div>
  );
}
