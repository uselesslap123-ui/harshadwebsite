
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { summary, studentName } from '@/lib/data';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {

  return (
    <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
        <Image
            src="https://images.unsplash.com/photo-1594704381926-5a026e79b5c3?q=80&w=2070&auto=format&fit=crop"
            alt="Semiconductor background"
            fill
            className="object-cover"
            priority
            data-ai-hint="semiconductor circuit"
        />
        <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto px-4 grid grid-cols-1 items-center relative z-10">
        <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight cursor-pointer text-white drop-shadow-lg"
                whileTap={{ scale: 0.95, rotate: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                Hi, I'm <span className="text-primary">{studentName.split(' ')[0]}</span>
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
