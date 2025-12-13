import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { socialLinks, studentName } from '@/lib/data';
import { Github, Linkedin } from 'lucide-react';

const icons: { [key: string]: React.ElementType } = {
  Github,
  Linkedin,
};

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {studentName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => {
              const Icon = icons[link.icon];
              return (
                <Button key={link.name} variant="ghost" size="icon" asChild>
                  <Link href={link.url} target="_blank" rel="noopener noreferrer">
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
