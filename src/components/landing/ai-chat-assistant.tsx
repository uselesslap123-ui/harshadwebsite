'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Bot, Send, User, Loader2, MessageSquare } from 'lucide-react';
import { AvatarWithRing } from '../shared/avatar-with-ring';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { chatWithAssistant } from '@/ai/flows/chat-assistant';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  parts: [{ text: string }];
};

export function AiChatAssistant({ show, onHide }: { show: boolean; onHide: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const avatarImage = PlaceHolderImages.find((p) => p.id === 'avatar');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isProcessing]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    const newMessage: Message = { role: 'user', parts: [{ text: userMessage }] };
    
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const response = await chatWithAssistant({
        message: userMessage,
        history: messages,
      });

      const aiMessage: Message = {
        role: 'model',
        parts: [{ text: response.response }],
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'model',
        parts: [{ text: "I'm sorry, I'm having trouble connecting right now. Please try again later." }],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
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
              aria-label="Open AI Assistant"
            >
              <MessageSquare size={28} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[600px]"
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <Card className="w-full h-full flex flex-col shadow-2xl rounded-none sm:rounded-xl overflow-hidden border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4">
                <div className="flex items-center gap-3">
                  <Bot size={24} className="animate-pulse" />
                  <div>
                    <CardTitle className="text-lg font-semibold leading-none">Harshad's AI</CardTitle>
                    <p className="text-xs opacity-80 mt-1">Online & ready to help</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20" onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </Button>
              </CardHeader>
              
              <CardContent className="flex-1 p-0 bg-muted/30 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {/* Welcome Message */}
                    <div className="flex items-start gap-3">
                      {avatarImage && <AvatarWithRing imageUrl={avatarImage.imageUrl} alt="Assistant" className="h-8 w-8" />}
                      <div className="bg-background border p-3 rounded-lg rounded-tl-none text-sm shadow-sm max-w-[85%]">
                        <p>Hi! I'm Harshad's AI assistant. Ask me anything about his projects, skills, or experience!</p>
                      </div>
                    </div>

                    {/* Chat History */}
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "flex items-start gap-3",
                          msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                        )}
                      >
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                          msg.role === 'user' ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                        )}>
                          {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={cn(
                          "p-3 rounded-lg text-sm shadow-sm max-w-[85%]",
                          msg.role === 'user' 
                            ? "bg-primary text-primary-foreground rounded-tr-none" 
                            : "bg-background border rounded-tl-none text-foreground"
                        )}>
                          <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
                        </div>
                      </div>
                    ))}

                    {/* Loading State */}
                    {isProcessing && (
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Bot size={16} />
                        </div>
                        <div className="bg-background border p-3 rounded-lg rounded-tl-none text-sm shadow-sm">
                          <Loader2 size={16} className="animate-spin text-primary" />
                        </div>
                      </div>
                    )}
                    <div ref={scrollRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 border-t bg-background">
                <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects..."
                    autoComplete="off"
                    disabled={isProcessing}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim() || isProcessing}>
                    <Send size={18} />
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
