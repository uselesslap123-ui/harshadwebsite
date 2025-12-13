import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { experiences } from '@/lib/data';
import { Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function Experience() {
  return (
    <SectionWrapper id="experience" className="bg-background">
      <SectionTitle>Experience & Training</SectionTitle>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
        {experiences.map((exp, index) => (
          <div key={index} className="relative mb-8 flex items-center justify-between w-full">
            <div className={`order-1 w-5/12 ${index % 2 === 0 ? 'md:hidden' : 'hidden'}`}></div>
            <div className="z-10 flex items-center justify-center order-1 bg-primary text-primary-foreground shadow-xl w-12 h-12 rounded-full">
              <Briefcase className="h-6 w-6" />
            </div>
            <Card className={`order-1 w-full md:w-5/12 shadow-lg ${index % 2 === 0 ? 'md:text-left' : 'md:text-right md:ml-auto'}`}>
              <CardHeader>
                <p className="text-sm text-muted-foreground">{exp.year} - {exp.company}</p>
                <CardTitle className="text-lg">{exp.title}</CardTitle>
                <CardDescription>{exp.description}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
