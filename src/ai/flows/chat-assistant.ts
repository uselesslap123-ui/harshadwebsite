
'use server';

/**
 * @fileOverview A conversational AI assistant for Harshad's portfolio website.
 *
 * - chatWithAssistant - A function that handles the conversation with the AI assistant.
 * - ChatWithAssistantInput - The input type for the function.
 * - ChatWithAssistantOutput - The return type for the function.
 */

import { ai, model } from '@/ai/genkit';
import { z } from 'genkit';
import { studentName, summary, skills, experiences, projects, education } from '@/lib/data';

const ChatWithAssistantInputSchema = z.object({
  history: z.array(z.any()).describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});
export type ChatWithAssistantInput = z.infer<typeof ChatWithAssistantInputSchema>;

const ChatWithAssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response.'),
});
export type ChatWithAssistantOutput = z.infer<typeof ChatWithAssistantOutputSchema>;

export async function chatWithAssistant(
  input: ChatWithAssistantInput
): Promise<ChatWithAssistantOutput> {
  return chatAssistantFlow(input);
}

const portfolioContext = `
You are an enthusiastic AI assistant for ${studentName}'s portfolio website. Your goal is to help visitors learn about Harshad's background, skills, and projects.

CONTEXT DATA:
- Name: ${studentName}
- Summary: ${summary.description}
- Inspiring Quote: "${summary.inspiring_quote}"
- Education: ${education.degree} at ${education.university} (${education.years}). ${education.status}.
- Skills: ${skills.map(s => s.name).join(', ')}.
- Recent Experience:
  ${experiences.slice(0, 3).map(e => `- ${e.title} at ${e.company} (${e.year})`).join('\n  ')}
- Top Projects:
  ${projects.slice(0, 3).map(p => `- ${p.name}: ${p.description}`).join('\n  ')}

GUIDELINES:
1. Be professional, friendly, and helpful.
2. Keep responses concise (2-4 sentences).
3. If you don't have specific data, politely suggest they use the contact form to reach out to Harshad directly.
4. Encourage users to check out the "Projects" section for more details.
`;

const chatAssistantFlow = ai.defineFlow(
  {
    name: 'chatAssistantFlow',
    inputSchema: ChatWithAssistantInputSchema,
    outputSchema: ChatWithAssistantOutputSchema,
  },
  async ({ history, message }) => {
    try {
      const genkitHistory = history.map((msg: any) => ({
        role: msg.role === 'model' ? 'model' : 'user',
        content: msg.parts || [{ text: msg.text || '' }],
      }));

      const { output } = await ai.generate({
        model: model,
        system: portfolioContext,
        history: genkitHistory,
        prompt: message,
        config: {
          safetySettings: [
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          ],
        },
      });

      return { 
        response: output?.text || "I'm here to help! Could you please rephrase your question?" 
      };
    } catch (error) {
      console.error('Chat Flow Error:', error);
      throw new Error('Failed to generate response');
    }
  }
);
