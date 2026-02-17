
'use client';

import Image from 'next/image';
import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

export function Projects() {
  const { toast } = useToast()

  const handleSourceClick = (projectName: string) => {
    if (projectName === "UPI QR Generator") {
      toast({
        title: "Private Project",
        description: "Admin is using this for personal work, so the source is private.",
      })
    } else {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <SectionWrapper id="projects" className="bg-card">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <SectionTitle>Projects</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.imageId);
            return (
                <motion.div key={index} variants={itemVariants}>
                    <Card className="flex flex-col h-full overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-primary/5 hover:border-primary/20 bg-background/50 backdrop-blur-sm">
                    {projectImage && (
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                            src={projectImage.imageUrl}
                            alt={project.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            data-ai-hint={projectImage.imageHint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">{project.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="bg-primary/5 text-primary-foreground/70 hover:bg-primary/10">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-start gap-2 pt-4">
                        <Button variant="outline" size="sm" onClick={() => handleSourceClick(project.name)} className="rounded-full">
                        <Github className="mr-2 h-4 w-4" />
                        Source
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => handleLiveDemoClick(project.name, project.liveDemoUrl)} className="rounded-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                        </Button>
                    </CardFooter>
                    </Card>
                </motion.div>
            );
            })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
