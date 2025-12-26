
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface AiChatAssistantProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AiChatAssistant({ isOpen, setIsOpen }: AiChatAssistantProps) {
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const phoneNumber = "9130947966";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(input)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    toast({
      title: 'Redirecting to WhatsApp',
      description: "Your message is ready to be sent!",
    });

    setInput('');
    setIsOpen(false);
  };

  const iconVariants = {
    initial: { opacity: 0, rotate: -90, scale: 0.8 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 90, scale: 0.8 },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm"
          >
            <Card className="shadow-2xl rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-card p-4 border-b">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 15, -10, 5, 0] }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <Bot className="text-primary h-7 w-7"/>
                  </motion.div>
                  <CardTitle className="text-lg font-headline">Quick Message</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 bg-background/50">
                <p className="text-sm text-muted-foreground">
                  Have a quick question? Send me a message directly on WhatsApp!
                </p>
              </CardContent>
              <CardFooter className="p-2 border-t bg-card">
                <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="bg-background"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim()}>
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button 
          size="lg" 
          className="rounded-full shadow-lg h-16 w-16 bg-gradient-to-br from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-110" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isOpen ? 'close' : 'open'}
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
            </motion.div>
          </AnimatePresence>
          <span className="sr-only">Toggle Chat</span>
        </Button>
      </motion.div>
    </>
  );
}
