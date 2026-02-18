'use client';

import { studentName } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Globe, Layers, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

const STATUS_MESSAGES = [
  "INITIALIZING KERNEL...",
  "LOADING HARDWARE MODULES...",
  "SYNCING REPOSITORIES...",
  "ESTABLISHING SECURE PROTOCOLS...",
  "OPTIMIZING UI INTERFACE...",
  "SYSTEMS ONLINE."
];

export function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const firstName = studentName.split(' ')[0].toUpperCase();

  useEffect(() => {
    const duration = 2500; // Total duration in ms
    const intervalTime = 30;
    const increment = (100 / (duration / intervalTime));

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Sync status messages with progress
    const msgIndex = Math.min(
      Math.floor((progress / 100) * STATUS_MESSAGES.length),
      STATUS_MESSAGES.length - 1
    );
    setStatusIndex(msgIndex);
  }, [progress]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      {/* Engineered Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Scanning Line Effect */}
      <motion.div 
        className="absolute inset-x-0 h-[1px] bg-primary/20 z-10 pointer-events-none"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-20 w-full max-w-sm flex flex-col items-center px-10">
        
        {/* Futuristic HUD Brackets */}
        <div className="relative p-8 mb-12 flex flex-col items-center">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/40" />

            {/* Core Logo/Identity */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-2"
            >
                <div className="relative">
                    <motion.h1 
                        className="text-4xl md:text-5xl font-headline font-bold tracking-[0.2em] text-white"
                        initial={{ letterSpacing: "0.1em" }}
                        animate={{ letterSpacing: "0.3em" }}
                        transition={{ duration: 2 }}
                    >
                        {firstName}
                    </motion.h1>
                    <motion.div 
                        className="absolute -right-4 top-0 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.8)]"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent my-2" />
                <p className="text-[10px] font-bold text-muted-foreground/60 tracking-[0.5em] uppercase">
                    E.E.D INTERFACE V2.0
                </p>
            </motion.div>
        </div>

        {/* Technical Progress Section */}
        <div className="w-full space-y-4">
            {/* Status Display */}
            <div className="flex justify-between items-end h-4 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.p 
                        key={statusIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-[9px] font-code text-primary/80 font-bold tracking-wider"
                    >
                        {STATUS_MESSAGES[statusIndex]}
                    </motion.p>
                </AnimatePresence>
                <span className="text-[10px] font-code text-muted-foreground font-bold">
                    {Math.round(progress)}%
                </span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="flex gap-1 h-1 w-full">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                        key={i} 
                        className={`flex-1 transition-all duration-300 ${
                            (progress / 5) > i ? 'bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]' : 'bg-white/10'
                        }`}
                    />
                ))}
            </div>

            {/* Module Icons (Animated) */}
            <div className="flex justify-center gap-6 pt-2 opacity-40">
                <ModuleIcon icon={Cpu} active={progress > 20} delay={0.1} />
                <ModuleIcon icon={Database} active={progress > 40} delay={0.2} />
                <ModuleIcon icon={Globe} active={progress > 60} delay={0.3} />
                <ModuleIcon icon={ShieldCheck} active={progress > 80} delay={0.4} />
            </div>
        </div>
      </div>
    </div>
  );
}

function ModuleIcon({ icon: Icon, active, delay }: { icon: any, active: boolean, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0.2, scale: active ? 1.1 : 1 }}
            transition={{ delay }}
        >
            <Icon size={14} className={active ? "text-primary" : "text-white"} />
        </motion.div>
    );
}
