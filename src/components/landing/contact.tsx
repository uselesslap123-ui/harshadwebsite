
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateContactMessage } from '@/ai/flows/generate-contact-message';
import { Sparkles, Send, Loader2, FileText } from 'lucide-react';
import { studentName } from '@/lib/data';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  keywords: z.string().min(3, { message: 'Please provide some keywords.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export function Contact() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      keywords: '',
      message: '',
    },
  });

  const handleGenerateMessage = async () => {
    const { name, email, keywords } = form.getValues();
    if (!keywords || !name || !email) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in your name, email, and some keywords before generating a message.',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateContactMessage({
        name,
        email,
        keywords,
        recipientName: studentName,
      });
      form.setValue('message', result.message);
      toast({
        title: 'Message Generated!',
        description: 'The AI has drafted a message for you. Feel free to edit it.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'AI Generation Failed',
        description: 'Could not generate a message. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResumeDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast({
      title: "Resume Coming Soon!",
      description: "The resume is not yet available for download. Please check back later.",
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Here you would typically send the form data to a backend service
    console.log(values);

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: 'Message Sent!',
      description: "Thanks for reaching out! I'll get back to you soon.",
    });

    form.reset();
    setIsSubmitting(false);
  };

  return (
    <SectionWrapper id="contact" className="bg-card">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle>Contact Me</SectionTitle>
        <Card className="max-w-3xl mx-auto shadow-lg border-border/50">
          <CardContent className="p-6 sm:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. jane.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords for AI</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="e.g., Internship opportunity, project collaboration" {...field} />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-primary hover:bg-primary/10 rounded-full"
                            onClick={handleGenerateMessage}
                            disabled={isGenerating}
                            aria-label="Generate message with AI"
                          >
                            {isGenerating ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <Sparkles className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="The AI will generate a message here, or you can write your own." rows={7} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                   <Button size="lg" variant="outline" onClick={handleResumeDownload}>
                        <FileText className="mr-2 h-4 w-4" />
                        Download Resume
                   </Button>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </SectionWrapper>
  );
}
