'use server';

/**
 * @fileOverview AI-powered website layout generator.
 *
 * - generateWebsiteLayout - A function that generates a website layout based on user preferences.
 * - GenerateWebsiteLayoutInput - The input type for the generateWebsiteLayout function.
 * - GenerateWebsiteLayoutOutput - The return type for the generateWebsiteLayout function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWebsiteLayoutInputSchema = z.object({
  websiteName: z.string().describe('The name of the website.'),
  colorPalette: z
    .string()
    .describe(
      'A JSON string representing the color palette for the website, including primary, background, and accent colors.'
    ),
  typography: z.string().describe('The desired typography for the website.'),
  layoutPreferences: z
    .string()
    .describe(
      'Preferences for the website layout, such as minimalist design, whitespace, and mobile-friendliness.'
    ),
  contentSections: z
    .array(z.string())
    .describe('An array of content sections to include in the layout.'),
});

export type GenerateWebsiteLayoutInput = z.infer<
  typeof GenerateWebsiteLayoutInputSchema
>;

const GenerateWebsiteLayoutOutputSchema = z.object({
  layout: z.string().describe('The generated website layout in JSON format.'),
  images: z
    .array(z.string())
    .describe('List of image URLs to enhance the visual appeal.'),
});

export type GenerateWebsiteLayoutOutput = z.infer<
  typeof GenerateWebsiteLayoutOutputSchema
>;

export async function generateWebsiteLayout(
  input: GenerateWebsiteLayoutInput
): Promise<GenerateWebsiteLayoutOutput> {
  return generateWebsiteLayoutFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWebsiteLayoutPrompt',
  input: {schema: GenerateWebsiteLayoutInputSchema},
  output: {schema: GenerateWebsiteLayoutOutputSchema},
  prompt: `You are an AI that designs website layouts. Consider the following:

Website Name: {{{websiteName}}}
Color Palette: {{{colorPalette}}}
Typography: {{{typography}}}
Layout Preferences: {{{layoutPreferences}}}
Content Sections: {{#each contentSections}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Generate a website layout in JSON format, and suggest relevant image URLs.

Output:`,
});

const generateWebsiteLayoutFlow = ai.defineFlow(
  {
    name: 'generateWebsiteLayoutFlow',
    inputSchema: GenerateWebsiteLayoutInputSchema,
    outputSchema: GenerateWebsiteLayoutOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
