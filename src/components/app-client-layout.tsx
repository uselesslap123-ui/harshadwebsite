'use client';

import { Toaster } from "@/components/ui/toaster";
import { AppThemeProvider } from '@/components/theme-provider';
import { useEffect, useState } from 'react';
import { SplashScreen } from '@/components/splash-screen';
import { AiChatAssistant } from '@/components/ai-chat-assistant';
import { ScrollEndNotifier } from '@/components/scroll-end-notifier';

export function AppClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isLoading, setIsLoading] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        // Simulate a loading time for the splash screen
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <SplashScreen />
            ) : (
                <AppThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                    <AiChatAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
                    <ScrollEndNotifier onOpenChat={() => setIsChatOpen(true)} />
                </AppThemeProvider>
            )}
        </>
    );
}
