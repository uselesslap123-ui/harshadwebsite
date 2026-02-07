
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
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Share2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { studentName } from '@/lib/data';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  contactNo: z.string().optional(),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  position: z.string().min(2, { message: 'Position must be at least 2 characters.' }),
});

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      contactNo: '',
      subject: '',
      position: '',
    },
  });

  const generatePDF = (data: z.infer<typeof formSchema>) => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();

    // Background decoration
    doc.setFillColor(245, 245, 250);
    doc.rect(0, 0, 210, 297, 'F');

    // Header
    doc.setDrawColor(63, 81, 181);
    doc.setLineWidth(1.5);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(24);
    doc.setTextColor(63, 81, 181);
    doc.setFont('helvetica', 'bold');
    doc.text('Professional Inquiry', 20, 45);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Reference ID: ${Math.random().toString(36).substring(7).toUpperCase()}`, 150, 45);
    doc.text(`Generated: ${timestamp}`, 20, 55);
    
    // Content Box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(20, 65, 170, 100, 3, 3, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.roundedRect(20, 65, 170, 100, 3, 3, 'S');

    doc.setFontSize(12);
    doc.setTextColor(50);
    
    const fields = [
      { label: 'Sender Name', value: data.name },
      { label: 'Email Address', value: data.email },
      { label: 'Contact Number', value: data.contactNo || 'Not Provided' },
      { label: 'Subject', value: data.subject },
      { label: 'Applied Position', value: data.position },
    ];

    let yPos = 85;
    fields.forEach((field) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${field.label}:`, 30, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(String(field.value), 80, yPos);
      yPos += 15;
    });

    // Footer
    doc.setDrawColor(63, 81, 181);
    doc.setLineWidth(0.5);
    doc.line(20, 265, 190, 265);
    
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`Official Inquiry for ${studentName}`, 20, 275);
    doc.text('This document serves as a formal record of contact.', 20, 282);

    return doc.save(`Inquiry_${data.name.replace(/\s+/g, '_')}.pdf`, { returnPromise: true });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const { name, email, contactNo, subject, position } = values;
      const phoneNumber = "9130947966";
      
      const formattedMessage = `*FORMAL PDF INQUIRY PREPARED*\n` +
        `----------------------------\n` +
        `👤 *Name:* ${name}\n` +
        `📧 *Email:* ${email}\n` +
        `📌 *Subject:* ${subject}\n` +
        `💼 *Position:* ${position}\n` +
        `----------------------------\n` +
        `_Hello, I have just downloaded a professional PDF of this inquiry. I am now attaching it to this chat. Please review it._`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`;

      // Generate and Download PDF
      generatePDF(values);

      toast({
        title: 'Step 1 Complete: PDF Downloaded',
        description: "Step 2: Attach the 'Inquiry' file in the WhatsApp window opening now.",
      });

      // Small delay to ensure download initiates before redirect
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        form.reset();
        setIsSubmitting(false);
      }, 1200);

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
    <SectionWrapper id="contact" className="bg-card">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle>Contact Me</SectionTitle>
        <Card className="max-w-3xl mx-auto shadow-lg border-border/50 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" {...field} />
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
                          <Input placeholder="jane@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contactNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact No (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 12345 67890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Proposal" {...field} />
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
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparing PDF...
                      </>
                    ) : (
                      <>
                        Send & Export to WhatsApp
                        <Share2 className="ml-2 h-4 w-4" />
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
