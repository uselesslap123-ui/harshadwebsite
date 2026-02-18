'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionTitle } from '@/components/shared/section-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Share2, Sparkles, Wand2, MessageSquareText } from 'lucide-react';
import { studentName } from '@/lib/data';
import { generateContactMessage } from '@/ai/flows/generate-contact-message';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  contactNo: z.string().optional(),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  position: z.string().min(2, { message: 'Position must be at least 2 characters.' }),
  keywords: z.string().optional(),
});

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [aiDraft, setAiDraft] = useState('');
  const [displayedDraft, setDisplayedDraft] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      contactNo: '',
      subject: '',
      position: '',
      keywords: '',
    },
  });

  // Typing effect for the AI draft
  useEffect(() => {
    if (aiDraft) {
      let i = 0;
      setDisplayedDraft('');
      const interval = setInterval(() => {
        setDisplayedDraft((prev) => prev + aiDraft.charAt(i));
        i++;
        if (i >= aiDraft.length) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [aiDraft]);

  const handleAiDraft = async () => {
    const { name, email, keywords } = form.getValues();
    if (!name || !email || !keywords) {
      toast({
        title: "Missing Information",
        description: "Please fill in your Name, Email, and some Keywords first.",
        variant: "destructive",
      });
      return;
    }

    setIsDrafting(true);
    try {
      const result = await generateContactMessage({
        name,
        email,
        keywords,
        recipientName: studentName,
      });
      setAiDraft(result.message);
    } catch (error) {
      toast({
        title: "Drafting Failed",
        description: "Could not connect to the AI service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDrafting(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const { name, email, contactNo, subject, position } = values;
      const phoneNumber = "9130947966";
      
      const formattedMessage = `*NEW INQUIRY*\n` +
        `----------------------------\n` +
        `👤 *Name:* ${name}\n` +
        `📧 *Email:* ${email}\n` +
        `📞 *Contact:* ${contactNo || 'Not Provided'}\n` +
        `📌 *Subject:* ${subject}\n` +
        `💼 *Position:* ${position}\n` +
        `----------------------------\n` +
        `📝 *AI Draft Message:*\n${aiDraft || 'No draft provided'}\n` +
        `----------------------------\n` +
        `_Sent via Portfolio Website_`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`;

      toast({
        title: 'Form Submitted',
        description: "Redirecting to WhatsApp...",
      });

      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        form.reset();
        setAiDraft('');
        setDisplayedDraft('');
        setIsSubmitting(false);
      }, 800);

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process inquiry.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <SectionWrapper id="contact" className="bg-card relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle>Contact Me</SectionTitle>
        <Card className="max-w-4xl mx-auto shadow-2xl border-primary/10 overflow-hidden bg-background/60 backdrop-blur-xl">
          <CardContent className="p-6 sm:p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest text-primary/70">Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" className="bg-background focus-visible:ring-primary h-12" {...field} />
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
                        <FormLabel className="font-bold text-xs uppercase tracking-widest text-primary/70">Your Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jane@example.com" className="bg-background focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest text-primary/70">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Project Collaboration" className="bg-background focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest text-primary/70">Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Engineering Manager" className="bg-background focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* AI MAGIC DRAFTER */}
                <div className="pt-4 border-t border-primary/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                    <h3 className="font-headline text-lg font-bold">AI Magic Message Drafter</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">What do you want to talk about? (e.g., "Internship opportunity in Flutter")</FormLabel>
                        <div className="flex gap-2">
                          <FormControl className="flex-1">
                            <Input placeholder="Add keywords here..." className="bg-background/40" {...field} />
                          </FormControl>
                          <Button 
                            type="button" 
                            onClick={handleAiDraft} 
                            disabled={isDrafting}
                            variant="secondary"
                            className="shrink-0 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
                          >
                            {isDrafting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4 mr-2" />}
                            Draft with AI
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />

                  <AnimatePresence>
                    {(displayedDraft || isDrafting) && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6"
                      >
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                              <MessageSquareText size={16} className="text-primary" />
                           </div>
                           <p className="text-sm md:text-base text-foreground/80 leading-relaxed min-h-[4rem]">
                              {displayedDraft}
                              {isDrafting && <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse" />}
                           </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-center pt-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting} 
                    className="w-full md:w-auto px-12 h-14 rounded-full font-bold text-lg shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      <>
                        Send to WhatsApp
                        <Share2 className="ml-2 h-5 w-5" />
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
