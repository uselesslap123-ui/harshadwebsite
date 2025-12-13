'use server';

/**
 * @fileOverview A flow for selecting relevant images and icons for the website based on the generated content and design.
 *
 * - selectWebsiteImages - A function that handles the selection of website images.
 * - SelectWebsiteImagesInput - The input type for the selectWebsiteImages function.
 * - SelectWebsiteImagesOutput - The return type for the selectWebsiteImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelectWebsiteImagesInputSchema = z.object({
  websiteContent: z
    .string()
    .describe('The generated content of the website to select images for.'),
  websiteDesignDescription: z
    .string()
    .describe('The description of the website design, including the color palette, typography, and layout.'),
});
export type SelectWebsiteImagesInput = z.infer<typeof SelectWebsiteImagesInputSchema>;

const SelectWebsiteImagesOutputSchema = z.object({
  imageUrls: z
    .array(z.string().url())
    .describe('The list of URLs of the selected images for the website.'),
  iconUrls: z
    .array(z.string().url())
    .describe('The list of URLs of the selected icons for the website.'),
});
export type SelectWebsiteImagesOutput = z.infer<typeof SelectWebsiteImagesOutputSchema>;

export async function selectWebsiteImages(input: SelectWebsiteImagesInput): Promise<SelectWebsiteImagesOutput> {
  return selectWebsiteImagesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selectWebsiteImagesPrompt',
  input: {schema: SelectWebsiteImagesInputSchema},
  output: {schema: SelectWebsiteImagesOutputSchema},
  prompt: `You are an AI assistant specialized in selecting relevant images and icons for websites.

  Based on the provided website content and design description, select a list of image URLs and a list of icon URLs that would enhance the visual appeal and user experience of the website.

  Consider the following website content:
  {{websiteContent}}

  And the following website design description:
  {{websiteDesignDescription}}

  Provide the output in JSON format. The image URLs should be visually appealing and relevant to the content, while the icon URLs should be simple, elegant, and complement the overall aesthetic.

  Prioritize free stock images and icons. Make sure to provide actual valid URLs.
  `,
});

const selectWebsiteImagesFlow = ai.defineFlow(
  {
    name: 'selectWebsiteImagesFlow',
    inputSchema: SelectWebsiteImagesInputSchema,
    outputSchema: SelectWebsiteImagesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
