
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { summary, studentName } from '@/lib/data';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const BlobShape = () => (
  <svg
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 w-full h-full text-primary"
    fill="currentColor"
  >
    <path d="M433,293.5Q423,337,392,370Q361,403,319,425.5Q277,448,233,439Q189,430,150,405.5Q111,381,89.5,343.5Q68,306,53.5,263Q39,220,77.5,188Q116,156,145,123.5Q174,91,215,73Q256,55,302,63.5Q348,72,379,105Q410,138,427,181.5Q444,225,433,293.5Z" />
  </svg>
);


export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <section className="relative bg-background py-20 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight">
                Hi, I'm <span className="text-primary">{studentName.split(' ')[0]}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground italic">
                {summary.inspiring_quote}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                <Link href="#projects">
                View My Work
                <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                </Link>
            </Button>
            </div>
        </motion.div>
        
        <motion.div 
            className="relative w-full max-w-sm mx-auto md:max-w-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
            <div className="relative aspect-square">
                <BlobShape />
                {heroImage && (
                    <div className="absolute inset-0 p-8 transform scale-[0.85] translate-y-[-2%]">
                        <Image
                            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY1ODcyMDU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Portrait of Harshad Shewale"
                            fill
                            className="object-cover rounded-full"
                            data-ai-hint="male portrait"
                            priority
                        />
                    </div>
                )}
            </div>
        </motion.div>
      </div>
    </section>
  );
}
