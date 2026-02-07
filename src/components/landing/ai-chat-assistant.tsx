'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, Loader2, Bot, Volume2, VolumeX, FileText } from 'lucide-react';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { AvatarWithRing } from '../shared/avatar-with-ring';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { jsPDF } from 'jspdf';
import { studentName } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export function AiChatAssistant({ show, onHide }: { show: boolean; onHide: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const avatarImage = PlaceHolderImages.find(p => p.id === 'avatar');
  const { toast } = useToast();

  const [audioLoadingId, setAudioLoadingId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div');
      if (scrollViewport) {
        scrollViewport.scrollTo({ top: scrollViewport.scrollHeight, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [history, isOpen]);
  
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const generateQuickPdf = (message: string) => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();

    doc.setFontSize(20);
    doc.setTextColor(63, 81, 181);
    doc.text('Quick Inquiry', 20, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${timestamp}`, 20, 40);
    
    doc.line(20, 45, 190, 45);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'bold');
    doc.text('Message Content:', 20, 60);

    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(message, 150), 20, 70);

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Message sent to ${studentName} via Chat Assistant`, 20, 280);

    doc.save(`Quick_Message_${Date.now()}.pdf`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, parts: [{ text: input }] };
    setHistory((prev) => [...prev, userMessage]);
    
    const phoneNumber = "9130947966";
    const formattedMsg = `*New Quick Inquiry (PDF Generated)*\n\n${input}\n\n_Sent via Portfolio Chat_`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMsg)}`;
    
    // Generate PDF
    generateQuickPdf(input);

    // Redirect
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      toast({
        title: 'PDF Exported!',
        description: 'Your message has been converted to PDF. Please attach it in WhatsApp.',
      });
      setInput('');
    }, 500);
  };
  
  const handleSpeak = async (messageId: string, text: string) => {
    if (playingAudioId === messageId && audioRef.current) {
      audioRef.current.pause();
      setPlayingAudioId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setAudioLoadingId(messageId);
    setPlayingAudioId(null);

    try {
      const { audio } = await textToSpeech(text);
      const newAudio = new Audio(audio);
      audioRef.current = newAudio;
      
      newAudio.onplay = () => {
          setPlayingAudioId(messageId);
      };

      newAudio.onended = () => {
          setPlayingAudioId(null);
          audioRef.current = null;
      };
      
      newAudio.play();

    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setAudioLoadingId(null);
    }
  };

  const containerVariants = {
    closed: { opacity: 0, scale: 0.8, y: 50 },
    open: { opacity: 1, scale: 1, y: 0 },
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Button
              size="lg"
              className="rounded-full shadow-lg h-16 w-16"
              onClick={() => setIsOpen(true)}
              aria-label="Open chat"
            >
              <MessageSquare size={28} />
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
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <Card className="w-full h-full flex flex-col shadow-2xl rounded-none sm:rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4 border-b">
                <div className="flex items-center gap-3">
                  <Bot size={24} />
                  <CardTitle className="text-lg font-semibold">Inquiry PDF & WhatsApp</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/80" onClick={() => { setIsOpen(false); onHide(); }}>
                  <X size={20} />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1" ref={scrollAreaRef}>
                  <div className="p-4 space-y-6">
                    <div className="flex items-start gap-3">
                      {avatarImage && <AvatarWithRing imageUrl={avatarImage.imageUrl} alt="AI Assistant" />}
                      <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%] group relative">
                        <p className="font-semibold text-sm mb-1">Assistant</p>
                        <p className="text-sm">Hi there! Type your message. I'll generate a formal PDF for you and then redirect you to WhatsApp so you can send it directly to Harshad.</p>
                         <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -bottom-4 -right-4 h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleSpeak("initial-greeting", "Hi there! Type your message. I'll generate a formal PDF for you and then redirect you to WhatsApp so you can send it directly to Harshad.")}
                            disabled={audioLoadingId !== null}
                        >
                            {audioLoadingId === "initial-greeting" ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : playingAudioId === "initial-greeting" ? (
                                <VolumeX className="h-4 w-4" />
                            ) : (
                                <Volume2 className="h-4 w-4" />
                            )}
                        </Button>
                      </div>
                    </div>

                    {history.map((msg, index) => {
                      const messageId = `msg-${index}`;
                      return (
                        <div
                          key={messageId}
                          className={`flex items-start gap-3 ${
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {msg.role === 'model' && avatarImage && <AvatarWithRing imageUrl={avatarImage.imageUrl} alt="AI Assistant"/>}

                          <div
                            className={`p-3 rounded-lg max-w-[80%] group relative ${
                              msg.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                : 'bg-muted rounded-tl-none'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{msg.parts[0].text}</p>
                            {msg.role === 'model' && (
                              <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute -bottom-4 -right-4 h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleSpeak(messageId, msg.parts[0].text)}
                                  disabled={audioLoadingId !== null}
                              >
                                  {audioLoadingId === messageId ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : playingAudioId === messageId ? (
                                      <VolumeX className="h-4 w-4" />
                                  ) : (
                                      <Volume2 className="h-4 w-4" />
                                  )}
                              </Button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type inquiry here..."
                    autoComplete="off"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim()}>
                    <FileText size={20} />
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