
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { motion } from 'framer-motion';

interface SectionWrapperProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
    return (
        <section id={id} className={cn("py-16 md:py-24", className)}>
            <div className="container mx-auto px-4">
                {children}
            </div>
        </section>
    );
}

const SectionTitle = ({ children, className }: { children: ReactNode, className?: string }) => (
    <motion.h2 
        initial={{ opacity: 0.8 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn("text-3xl font-headline md:text-4xl font-bold text-center mb-12", className)}
    >
        <motion.span
            className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            style={{ backgroundSize: '200% 200%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
        >
            {children}
        </motion.span>
    </motion.h2>
);

export { SectionTitle };
