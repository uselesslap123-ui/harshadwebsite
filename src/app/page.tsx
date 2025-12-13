import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Summary } from '@/components/landing/summary';
import { Skills } from '@/components/landing/skills';
import { Experience } from '@/components/landing/experience';
import { Projects } from '@/components/landing/projects';
import { Education } from '@/components/landing/education';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Summary />
        <Skills />
        <Experience />
        <Projects />
        <Education />
      </main>
      <Footer />
    </div>
  );
}
