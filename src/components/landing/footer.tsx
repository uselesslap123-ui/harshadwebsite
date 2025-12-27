
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { socialLinks, studentName, navLinks, summary } from '@/lib/data';
import { Github, Linkedin, Sparkles } from 'lucide-react';

const icons: { [key: string]: React.ElementType } = {
  Github,
  Linkedin,
};

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Column: Brand & Quote */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-headline">{studentName}</span>
            </Link>
            <p className="max-w-xs text-muted-foreground italic">
              "{summary.inspiring_quote}"
            </p>
          </div>
          
          {/* Right Column: Quick Links */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="font-headline font-semibold text-lg mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="border-t pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground order-2 sm:order-1 text-center sm:text-left">
            &copy; {new Date().getFullYear()} {studentName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            {socialLinks.map((link) => {
              const Icon = icons[link.icon];
              return (
                <Button key={link.name} variant="ghost" size="icon" asChild>
                  <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                    {Icon && <Icon className="h-5 w-5" />}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
