'use client';

import Image from 'next/image';
import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, ExternalLink, Code2 } from 'lucide-react';
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
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <SectionWrapper id="projects" className="bg-card relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <SectionTitle>Featured Projects</SectionTitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {projects.map((project, index) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.imageId);
            return (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                    <Card className="flex flex-col h-full overflow-hidden group border-primary/10 hover:border-primary/40 bg-background/60 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {projectImage && (
                        <div className="relative h-56 w-full overflow-hidden">
                            <Image
                              src={projectImage.imageUrl}
                              alt={project.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                              data-ai-hint={projectImage.imageHint}
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60" />
                            
                            {/* Tags on image (optional, moved from content for visual pop) */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                              {project.tags?.slice(0, 1).map((tag, tagIndex) => (
                                <Badge key={tagIndex} className="bg-primary/90 text-white border-none backdrop-blur-sm">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                        </div>
                    )}

                    <CardHeader className="relative z-10 pb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Code2 className="h-4 w-4 text-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Project #{index + 1}</span>
                        </div>
                        <CardTitle className="text-xl font-headline font-bold group-hover:text-primary transition-colors duration-300">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-sm text-muted-foreground/90 mt-1">
                          {project.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-grow space-y-4 relative z-10 pt-0">
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="bg-muted/50 text-[10px] font-medium py-0 px-2 border-transparent hover:bg-primary/10 hover:text-primary transition-colors">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="flex justify-start gap-3 pt-6 pb-6 relative z-10 border-t border-primary/5 bg-primary/[0.02]">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleSourceClick(project.name)} 
                          className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/5 text-xs h-9"
                        >
                          <Github className="mr-2 h-3.5 w-3.5" />
                          Source
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={() => handleLiveDemoClick(project.name, project.liveDemoUrl)} 
                          className="rounded-full bg-primary hover:bg-primary/90 text-white text-xs h-9 shadow-md hover:shadow-primary/25"
                        >
                          <ExternalLink className="mr-2 h-3.5 w-3.5" />
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