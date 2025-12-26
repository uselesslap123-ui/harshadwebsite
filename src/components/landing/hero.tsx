import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { summary, studentName } from '@/lib/data';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <section className="relative h-[90dvh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 animated-bg" />

      <div className="relative z-10 p-4 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight drop-shadow-lg transition-all duration-300 hover:scale-105 hover:text-white active:scale-95 cursor-pointer">
          {studentName}
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-white italic drop-shadow-md">
          {summary.inspiring_quote}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group shadow-lg hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-1">
            <Link href="#projects">
              View My Work
              <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
