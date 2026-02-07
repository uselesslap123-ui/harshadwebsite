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
import { Send, Loader2, FileText } from 'lucide-react';
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

    doc.save(`Inquiry_${data.name.replace(/\s+/g, '_')}.pdf`);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const { name, email, contactNo, subject, position } = values;
      const phoneNumber = "9130947966";
      
      const formattedMessage = `*Formal Inquiry (PDF Generated)*\n` +
        `----------------------------\n` +
        `👤 *Name:* ${name}\n` +
        `📧 *Email:* ${email}\n` +
        `📞 *Contact:* ${contactNo || 'N/A'}\n` +
        `📌 *Subject:* ${subject}\n` +
        `💼 *Position:* ${position}\n` +
        `----------------------------\n` +
        `_Note: I have attached the formal PDF inquiry for your records._`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`;

      // Generate PDF
      generatePDF(values);

      // Small delay to ensure download starts before redirect
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        toast({
          title: 'PDF Generated & Downloaded!',
          description: "Please attach the PDF in the WhatsApp chat that just opened.",
        });
        form.reset();
        setIsSubmitting(false);
      }, 500);

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process inquiry. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };


  return (
    <SectionWrapper id="contact" className="bg-card">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionTitle>Contact Me</SectionTitle>
        </motion.div>
        <Card className="max-w-3xl mx-auto shadow-lg border-border/50 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
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
                  </motion.div>
                  <motion.div variants={itemVariants}>
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
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="contactNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact No (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. +91 12345 67890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Internship Opportunity" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-end gap-4">
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Send Inquiry (PDF Generated)
                        <FileText className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </SectionWrapper>
  );
}