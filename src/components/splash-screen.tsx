
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
    <path fill="#40c4ff" d="M70.6 141.2l44.4-44.3-44.4-44.3-21.2 21.2 23.2 23.1-23.2 23.2z" />
    <path fill="#40c4ff" d="M70.6 52.6l-44.4-44.3 44.4-8.3-21.2 21.2" opacity=".85" />
    <path fill="#00b0ff" d="M26.2 96.9l21.2 21.2-23.2 23.1-21.2-21.2z" />
    <path fill="#0091ea" d="M70.6 96.9l-23.2-23.1 23.2-23.2-21.2-21.2-44.4 44.4z" />
    <path fill="#b3e5fc" d="M49.4 73.8l21.2-21.2-21.2-21.2-21.2 21.2z" />
  </svg>
);

const LogoRainDrop = ({ id }: { id: number }) => {
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const duration = Math.random() * 5 + 5; // 5 to 10 seconds
    const delay = Math.random() * 5; // 0 to 5 seconds delay
    const initialX = Math.random() * 100;
    const finalX = initialX + (Math.random() - 0.5) * 50; // drift left or right
    const initialRotation = Math.random() * 360;
    const finalRotation = initialRotation + (Math.random() - 0.5) * 360;
    const scale = Math.random() * 0.5 + 0.5; // 0.5 to 1.0 scale

    setStyles({
      position: 'absolute',
      top: '-20%',
      left: `${initialX}vw`,
      transform: `scale(${scale}) rotate(${initialRotation}deg)`,
      opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8 opacity
    });

    return () => {}; // No cleanup needed
  }, [id]);


  const variants = {
    initial: {},
    animate: {
      y: '120vh',
      x: `${(Math.random() - 0.5) * 40}vw`,
      rotate: (Math.random() - 0.5) * 720,
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

  return (
    <motion.div
      className="w-12 h-12"
      initial={{ 
        y: '-20vh', 
        x: `${Math.random() * 100}vw`,
        scale: Math.random() * 0.5 + 0.5,
        rotate: Math.random() * 360,
        opacity: Math.random() * 0.5 + 0.5,
      }}
      animate={variants.animate}
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
          {`Hello! ${studentName.split(' ')[0]} this side`}
        </h1>
      </motion.div>
    </div>
  );
}
