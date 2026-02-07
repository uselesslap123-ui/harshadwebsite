
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Bot, Send, User, Loader2, MessageSquare, Sparkles } from 'lucide-react';
import { AvatarWithRing } from '../shared/avatar-with-ring';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { chatWithAssistant } from '@/ai/flows/chat-assistant';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  parts: [{ text: string }];
};

const SUGGESTED_QUESTIONS = [
  "What projects have you worked on?",
  "Tell me about your Basic Electronics skills.",
  "What did you learn at the AI Bootcamp?",
  "Tell me about the Robonauts club.",
  "What is your philosophy on engineering?",
];

export function AiChatAssistant({ show }: { show: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const avatarImage = PlaceHolderImages.find((p) => p.id === 'avatar');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowNotification(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isProcessing]);

  const handleSendMessage = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    
    const userMessage = textOverride || input.trim();
    if (!userMessage || isProcessing) return;

    const newMessage: Message = { role: 'user', parts: [{ text: userMessage }] };
    
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const result = await chatWithAssistant({
        message: userMessage,
        history: messages,
      });

      const aiMessage: Message = {
        role: 'model',
        parts: [{ text: result.response }],
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'model',
        parts: [{ text: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment." }],
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
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-br-none shadow-xl text-sm font-medium mb-2 flex items-center gap-2"
                >
                  <Sparkles size={14} className="animate-pulse" />
                  Ask me about Harshad!
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
                    className="ml-2 opacity-70 hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              size="lg"
              className="rounded-full shadow-2xl h-16 w-16 group relative overflow-hidden"
              onClick={() => {
                setIsOpen(true);
                setShowNotification(false);
              }}
              aria-label="Open AI Assistant"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-0 group-hover:opacity-10 transition-opacity" />
              <MessageSquare size={28} className="group-hover:scale-110 transition-transform" />
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
            <Card className="w-full h-full flex flex-col shadow-2xl rounded-none sm:rounded-2xl overflow-hidden border-primary/20 bg-background/95 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Bot size={24} className="animate-pulse" />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold tracking-tight">AI Assistant</CardTitle>
                    <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold">Harshad's Knowledge Base</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20 text-white" onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </Button>
              </CardHeader>
              
              <CardContent className="flex-1 p-0 bg-muted/10 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      {avatarImage && <AvatarWithRing imageUrl={avatarImage.imageUrl} alt="Assistant" className="h-8 w-8" />}
                      <div className="bg-background border p-3 rounded-2xl rounded-tl-none text-sm shadow-sm max-w-[85%]">
                        <p className="leading-relaxed">Hi! I'm Harshad's AI assistant. Ask me anything about his projects, skills, or engineering background!</p>
                      </div>
                    </div>

                    {messages.length === 0 && !isProcessing && (
                      <div className="pl-11 pr-4 py-2 space-y-2">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Suggested Questions</p>
                        <div className="flex flex-wrap gap-2">
                          {SUGGESTED_QUESTIONS.map((q, i) => (
                            <button
                              key={i}
                              onClick={() => handleSendMessage(undefined, q)}
                              className="text-left bg-background border border-primary/20 hover:border-primary hover:bg-primary/5 transition-colors px-3 py-1.5 rounded-full text-xs font-medium text-primary shadow-sm"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "flex items-start gap-3 animate-fade-in",
                          msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                        )}
                      >
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                          msg.role === 'user' ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                        )}>
                          {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={cn(
                          "p-3 rounded-2xl text-sm shadow-sm max-w-[85%] leading-relaxed",
                          msg.role === 'user' 
                            ? "bg-primary text-primary-foreground rounded-tr-none" 
                            : "bg-background border rounded-tl-none text-foreground"
                        )}>
                          <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
                        </div>
                      </div>
                    ))}

                    {isProcessing && (
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Bot size={16} />
                        </div>
                        <div className="bg-background border p-3 rounded-2xl rounded-tl-none text-sm shadow-sm">
                          <Loader2 size={16} className="animate-spin text-primary" />
                        </div>
                      </div>
                    )}
                    <div ref={scrollRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 border-t bg-background">
                <form onSubmit={(e) => handleSendMessage(e)} className="flex w-full items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects..."
                    autoComplete="off"
                    disabled={isProcessing}
                    className="flex-1 rounded-full border-muted-foreground/20 focus-visible:ring-primary"
                  />
                  <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={!input.trim() || isProcessing}>
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
