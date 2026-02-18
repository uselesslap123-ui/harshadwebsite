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
import { Loader2, Share2 } from 'lucide-react';
import { studentName } from '@/lib/data';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  position: z.string().min(2, { message: 'Position must be at least 2 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      position: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const { name, email, subject, position, message } = values;
      const phoneNumber = "9130947966";
      
      const formattedMessage = `*NEW INQUIRY*\n` +
        `----------------------------\n` +
        `👤 *Name:* ${name}\n` +
        `📧 *Email:* ${email}\n` +
        `📌 *Subject:* ${subject}\n` +
        `💼 *Position:* ${position}\n` +
        `----------------------------\n` +
        `📝 *Message:*\n${message}\n` +
        `----------------------------\n` +
        `_Sent via Portfolio Website_`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`;

      toast({
        title: 'Form Prepared',
        description: "Redirecting to WhatsApp to send your message...",
      });

      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        form.reset();
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

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-xs uppercase tracking-widest text-primary/70">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can I help you?" 
                          className="bg-background focus-visible:ring-primary min-h-[150px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
