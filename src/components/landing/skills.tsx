import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import { skills } from '@/lib/data';

export function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-card">
      <SectionTitle>My Skillset</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <Card key={index} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <skill.icon className="h-10 w-10 mb-4 text-primary group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-sm md:text-base">{skill.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
