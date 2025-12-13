'use server';

/**
 * @fileOverview A flow for generating website text based on the website name and a brief description.
 *
 * - generateWebsiteText - A function that generates website text.
 * - GenerateWebsiteTextInput - The input type for the generateWebsiteText function.
 * - GenerateWebsiteTextOutput - The return type for the generateWebsiteText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWebsiteTextInputSchema = z.object({
  websiteName: z.string().describe('The name of the website.'),
  briefDescription: z.string().describe('A brief description of the website.'),
});
export type GenerateWebsiteTextInput = z.infer<typeof GenerateWebsiteTextInputSchema>;

const GenerateWebsiteTextOutputSchema = z.object({
  websiteText: z.string().describe('The generated website text.'),
});
export type GenerateWebsiteTextOutput = z.infer<typeof GenerateWebsiteTextOutputSchema>;

export async function generateWebsiteText(input: GenerateWebsiteTextInput): Promise<GenerateWebsiteTextOutput> {
  return generateWebsiteTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWebsiteTextPrompt',
  input: {schema: GenerateWebsiteTextInputSchema},
  output: {schema: GenerateWebsiteTextOutputSchema},
  prompt: `You are an AI website content generator. Generate website text based on the website name and a brief description.\n\nWebsite Name: {{{websiteName}}}\nBrief Description: {{{briefDescription}}}\n\nWebsite Text:`,
});

const generateWebsiteTextFlow = ai.defineFlow(
  {
    name: 'generateWebsiteTextFlow',
    inputSchema: GenerateWebsiteTextInputSchema,
    outputSchema: GenerateWebsiteTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
