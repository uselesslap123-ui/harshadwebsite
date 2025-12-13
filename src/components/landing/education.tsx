import Link from 'next/link';
import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { education } from '@/lib/data';
import { GraduationCap } from 'lucide-react';

export function Education() {
  return (
    <SectionWrapper id="education" className="bg-background">
      <SectionTitle>Education</SectionTitle>
      <Link href="https://bvcoenm.edu.in/" target="_blank" rel="noopener noreferrer" className="block max-w-2xl mx-auto group">
        <Card className="shadow-lg text-center group-hover:shadow-primary/20 group-hover:border-primary/50 transition-all duration-300">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-12 w-12 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-headline">{education.degree}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-lg text-muted-foreground">{education.university}</p>
            <p className="font-semibold text-primary">{education.years}</p>
            <p className="text-sm text-foreground/70 italic">{education.status}</p>
          </CardContent>
        </Card>
      </Link>
    </SectionWrapper>
  );
}
