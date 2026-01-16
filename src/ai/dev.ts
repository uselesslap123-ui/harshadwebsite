import { config } from 'dotenv';
config();

import '@/ai/flows/generate-website-text.ts';
import '@/ai/flows/generate-website-layout.ts';
import '@/ai/flows/select-website-images.ts';
import '@/ai/flows/generate-contact-message.ts';
import '@/ai/flows/chat-assistant';
import '@/ai/flows/text-to-speech';
