import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { summary } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

export function Summary() {
  return (
    <SectionWrapper id="summary" className="bg-background">
      <SectionTitle>About Me</SectionTitle>
      <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
            {summary.description}
          </p>
      </div>
    </SectionWrapper>
  );
}
