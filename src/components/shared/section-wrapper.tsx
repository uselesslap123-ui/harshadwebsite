import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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
    <h2 className={cn("text-3xl font-headline md:text-4xl font-bold text-center mb-12 text-primary", className)}>
        {children}
    </h2>
);

export { SectionTitle };
