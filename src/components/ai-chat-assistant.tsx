
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { chatWithAssistant } from '@/ai/flows/chat-assistant';
import { studentName } from '@/lib/data';

type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export function AiChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'model',
          parts: [{ text: `Hello! I'm an AI assistant for ${studentName}'s portfolio. How can I help you today?` }],
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableNode = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableNode) {
        scrollableNode.scrollTo({ top: scrollableNode.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [messages, isLoading]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.filter(m => m.role === 'user'); // Pass only user messages in history
      const result = await chatWithAssistant({ history, message: input });
      const assistantMessage: Message = { role: 'model', parts: [{ text: result.response }] };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI chat error:', error);
      const errorMessage: Message = {
        role: 'model',
        parts: [{ text: "I'm sorry, something went wrong. Please try again." }],
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
                  <Avatar className="h-9 w-9 border-2 border-primary">
                    <AvatarFallback className="bg-primary/20"><Bot className="text-primary"/></AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg font-headline">AI Assistant</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 bg-background/50">
                <ScrollArea className="h-80 w-full p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && (
                           <Avatar className="h-8 w-8">
                             <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                           </Avatar>
                        )}
                        <div className={`rounded-lg px-4 py-2 max-w-[80%] shadow-sm ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card'
                        }`}>
                          <p className="text-sm">{msg.parts[0].text}</p>
                        </div>
                         {msg.role === 'user' && (
                           <Avatar className="h-8 w-8">
                             <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                           </Avatar>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                       <div className="flex items-start gap-3">
                           <Avatar className="h-8 w-8">
                             <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                           </Avatar>
                           <div className="rounded-lg px-4 py-2 bg-card flex items-center shadow-sm">
                               <Loader2 className="h-5 w-5 animate-spin text-primary"/>
                           </div>
                       </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-2 border-t bg-card">
                <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something..."
                    disabled={isLoading}
                    className="bg-background"
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
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
        <Button size="lg" className="rounded-full shadow-lg h-16 w-16" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
          <span className="sr-only">Toggle Chat</span>
        </Button>
      </motion.div>
    </>
  );
}
