
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

export function Projects() {
  const { toast } = useToast()

  const handleSourceClick = (projectName: string) => {
    if (projectName === "UPI QR Generator") {
      toast({
        title: "Private Project",
        description: "Admin is using this for personal work, so the source is private.",
      })
    } else {
      // You can add logic here for other projects, like opening a GitHub link
      toast({
        title: "Coming Soon",
        description: "The source code for this project will be available soon.",
      })
    }
  }

  const handleLiveDemoClick = (projectName: string, url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      toast({ title: "Coming Soon", description: "A live demo will be available soon."})
    }
  }

  return (
    <SectionWrapper id="projects" className="bg-card">
      <SectionTitle>Projects</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const projectImage = PlaceHolderImages.find(p => p.id === project.imageId);
          return (
            <Card key={index} className="flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              {projectImage && (
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={projectImage.imageUrl}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={projectImage.imageHint}
                    />
                </div>
              )}
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <CardFooter className="flex justify-start gap-2">
                <Button variant="outline" size="sm" onClick={() => handleSourceClick(project.name)}>
                  <Github className="mr-2 h-4 w-4" />
                  Source
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleLiveDemoClick(project.name, project.liveDemoUrl)}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
