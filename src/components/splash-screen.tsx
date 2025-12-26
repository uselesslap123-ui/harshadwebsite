
'use client';

import { studentName } from '@/lib/data';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FlutterLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 115 141.2"
      {...props}
    >
        <path d="M70.6 141.2l44.4-44.3-44.4-44.3-21.2 21.2 23.2 23.1-23.2 23.2z" fill="#40c4ff"/>
        <path d="M70.6 52.6l-44.4-44.3L70.6 0l-21.2 21.2" fill="#40c4ff" opacity=".85"/>
        <path d="M26.2 96.9l21.2 21.2-23.2 23.1-21.2-21.2z" fill="#00b0ff"/>
        <path d="M70.6 96.9l-23.2-23.1 23.2-23.2-21.2-21.2-44.4 44.4z" fill="#0091ea"/>
        <path d="M49.4 73.8l21.2-21.2-21.2-21.2-21.2 21.2z" fill="#b3e5fc"/>
    </svg>
);


const LogoRainDrop = ({ id }: { id: number }) => {
  const [initialStyles, setInitialStyles] = useState<React.CSSProperties>({ opacity: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      setInitialStyles({
        position: 'absolute',
        top: '-20vh', 
        left: `${Math.random() * 100}vw`,
        transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }
  }, []);

  const variants = {
    initial: {
      opacity: 0,
      y: '-20vh'
    },
    animate: {
      y: '120vh',
      x: `${(Math.random() - 0.5) * 40}vw`,
      rotate: `+=${(Math.random() - 0.5) * 720}`,
      opacity: [1, 0.8, 0],
      transition: {
        duration: Math.random() * 5 + 7, // 7 to 12 seconds
        delay: Math.random() * 7, // 0 to 7 seconds delay
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      }
    },
  };

  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      style={initialStyles}
      className="w-12 h-12"
      variants={variants}
      initial="initial"
      animate="animate"
    >
      <FlutterLogo />
    </motion.div>
  );
};


export function SplashScreen() {
  const logoCount = 20;

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground overflow-hidden">
      <div className="absolute inset-0 z-0">
        {Array.from({ length: logoCount }).map((_, i) => (
          <LogoRainDrop key={i} id={i} />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="text-center z-10"
      >
        <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary drop-shadow-md">
          {`Hello, I'm ${studentName.split(' ')[0]}`}
        </h1>
        <p className="mt-2 text-lg md:text-xl text-muted-foreground">Welcome to my portfolio</p>
      </motion.div>
    </div>
  );
}
