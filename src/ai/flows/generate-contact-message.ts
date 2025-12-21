
'use server';

/**
 * @fileOverview A flow for generating a professional contact message.
 *
 * - generateContactMessage - A function that drafts a message based on keywords.
 * - GenerateContactMessageInput - The input type for the function.
 * - GenerateContactMessageOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateContactMessageInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email of the person sending the message.'),
  keywords: z.string().describe('Keywords describing the purpose of the contact.'),
  recipientName: z.string().describe('The name of the portfolio owner.'),
});
export type GenerateContactMessageInput = z.infer<typeof GenerateContactMessageInputSchema>;

const GenerateContactMessageOutputSchema = z.object({
  message: z.string().describe('The generated professional message.'),
});
export type GenerateContactMessageOutput = z.infer<typeof GenerateContactMessageOutputSchema>;

export async function generateContactMessage(
  input: GenerateContactMessageInput
): Promise<GenerateContactMessageOutput> {
  return generateContactMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContactMessagePrompt',
  input: { schema: GenerateContactMessageInputSchema },
  output: { schema: GenerateContactMessageOutputSchema },
  prompt: `You are an AI assistant helping a visitor write a professional contact message to {{recipientName}}, the owner of this portfolio.

The visitor's name is {{name}} and their email is {{email}}.

Based on the following keywords, please draft a concise, polite, and professional message.

Keywords: {{{keywords}}}

The message should be from the perspective of {{name}}. Start with a greeting like "Hello {{recipientName}}," and end with a closing like "Best regards,\n{{name}}".

Do not include a subject line.

Generated Message:`,
});

const generateContactMessageFlow = ai.defineFlow(
  {
    name: 'generateContactMessageFlow',
    inputSchema: GenerateContactMessageInputSchema,
    outputSchema: GenerateContactMessageOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
