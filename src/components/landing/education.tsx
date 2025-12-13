import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { education } from '@/lib/data';
import { GraduationCap } from 'lucide-react';

export function Education() {
  return (
    <SectionWrapper id="education" className="bg-background">
      <SectionTitle>Education</SectionTitle>
      <Card className="max-w-2xl mx-auto shadow-lg text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
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
    </SectionWrapper>
  );
}
