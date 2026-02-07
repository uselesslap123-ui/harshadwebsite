
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Bot, FileText, Send, Paperclip } from 'lucide-react';
import { AvatarWithRing } from '../shared/avatar-with-ring';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { jsPDF } from 'jspdf';
import { studentName } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function AiChatAssistant({ show, onHide }: { show: boolean; onHide: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const avatarImage = PlaceHolderImages.find(p => p.id === 'avatar');
  const { toast } = useToast();

  const generateQuickPdf = (message: string) => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();

    doc.setFontSize(22);
    doc.setTextColor(63, 81, 181);
    doc.text('Quick Chat Inquiry', 20, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(`Timestamp: ${timestamp}`, 20, 40);
    doc.line(20, 45, 190, 45);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'bold');
    doc.text('Inquiry Message:', 20, 60);

    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(message, 170), 20, 70);

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Sent to ${studentName} via Portfolio Website`, 20, 280);

    doc.save(`Portfolio_Chat_${Date.now()}.pdf`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    const phoneNumber = "9130947966";
    const formattedMsg = `*QUICK PDF INQUIRY*\n\n_Note: I have just downloaded a formal PDF of this message. I am now attaching it here for your review._\n\nMessage: ${input}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMsg)}`;
    
    // 1. Generate and Download PDF
    generateQuickPdf(input);

    // 2. Notify user with explicit instructions
    toast({
      title: 'PDF Downloaded!',
      description: 'Redirecting to WhatsApp. Please use the Paperclip icon to attach the PDF.',
    });

    // 3. Redirect after short delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setInput('');
      setIsProcessing(false);
      setIsOpen(false);
    }, 1500);
  };

  const containerVariants = {
    closed: { opacity: 0, scale: 0.8, y: 50 },
    open: { opacity: 1, scale: 1, y: 0 },
  };

  if (!show) return null;

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <Button
              size="lg"
              className="rounded-full shadow-lg h-16 w-16"
              onClick={() => setIsOpen(true)}
              aria-label="Open chat"
            >
              <FileText size={28} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:max-h-[80vh] sm:h-auto"
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <Card className="w-full h-full flex flex-col shadow-2xl rounded-none sm:rounded-lg overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4">
                <div className="flex items-center gap-3">
                  <Bot size={24} />
                  <CardTitle className="text-lg font-semibold">PDF Chat Export</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20" onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-6 bg-muted/30">
                <div className="flex items-start gap-3 mb-6">
                  {avatarImage && <AvatarWithRing imageUrl={avatarImage.imageUrl} alt="Assistant" />}
                  <div className="bg-background border p-4 rounded-lg rounded-tl-none text-sm shadow-sm">
                    <p>Tell me what you need, and I'll generate a **professional PDF** for you to send to Harshad via WhatsApp.</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-primary font-medium bg-primary/10 p-2 rounded border border-primary/20">
                    <FileText size={14} />
                    <span>PDF generates on click</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-primary font-medium bg-primary/10 p-2 rounded border border-primary/20">
                    <Paperclip size={14} />
                    <span>Attach it in WhatsApp manually</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t bg-background">
                <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    autoComplete="off"
                    disabled={isProcessing}
                  />
                  <Button type="submit" size="icon" disabled={!input.trim() || isProcessing}>
                    <Send size={20} />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
