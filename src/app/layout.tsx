import type { Metadata } from 'next';
import './globals.css';
import { studentName } from '@/lib/data';
import { AppClientLayout } from '@/components/app-client-layout';

export const metadata: Metadata = {
  title: `${studentName} | Portfolio`,
  description: 'AI-Enhanced Portfolio for an Aspiring Electronics Engineer & Developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <title>{studentName} | Portfolio</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppClientLayout>{children}</AppClientLayout>
      </body>
    </html>
  );
}
