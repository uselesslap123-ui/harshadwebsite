
'use server';

/**
 * @fileOverview A conversational AI assistant for the portfolio website.
 *
 * - chatWithAssistant - A function that handles the conversation with the AI assistant.
 * - ChatWithAssistantInput - The input type for the function.
 * - ChatWithAssistantOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
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
You are an AI assistant for ${studentName}'s portfolio website. Your goal is to answer questions from visitors in a friendly, helpful, and professional manner.
You have access to all of Harshad's portfolio information. Use it to answer questions accurately.

Here is the information you have about Harshad Shewale:
- Name: ${studentName}
- Summary: ${summary.description}
- Inspiring Quote: "${summary.inspiring_quote}"
- Education: ${education.degree} at ${education.university} (${education.years}). Currently a 2nd-year student.
- Skills: ${skills.map(s => s.name).join(', ')}.
- Experience/Training:
  ${experiences.map(e => `- ${e.title} at ${e.company} (${e.year})`).join('\n  ')}
- Projects:
  ${projects.map(p => `- ${p.name}: ${p.description}`).join('\n  ')}

Your Persona:
- You are enthusiastic and positive.
- You are knowledgeable about Harshad's skills and experience.
- Keep your answers concise and to the point.
- If you don't know the answer to a question, politely say that you don't have that information but can direct them to the contact form.
- Gently guide users to the contact form for any direct inquiries or job opportunities for Harshad.
`;

const chatAssistantFlow = ai.defineFlow(
  {
    name: 'chatAssistantFlow',
    inputSchema: ChatWithAssistantInputSchema,
    outputSchema: ChatWithAssistantOutputSchema,
  },
  async ({ history, message }) => {
    const genkitHistory = history.map((msg: any) => ({
      role: msg.role,
      content: msg.parts,
    }));

    const { output } = await ai.generate({
      system: portfolioContext,
      history: genkitHistory,
      prompt: message,
    });

    return { response: output?.text || "I'm sorry, I couldn't generate a response." };
  }
);
