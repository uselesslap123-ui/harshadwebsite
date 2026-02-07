
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

// This is your Knowledge Base. It pulls data from src/lib/data.ts
const portfolioContext = `
You are a highly professional and enthusiastic AI assistant for ${studentName}'s personal portfolio. 
Your goal is to provide detailed, accurate information about Harshad to potential employers or collaborators.

CORE IDENTITY:
- Name: ${studentName}
- Title: ${summary.title}
- Philosophy: "${summary.inspiring_quote}"
- Overview: ${summary.description}

DETAILED KNOWLEDGE BASE:

1. EDUCATION:
- Degree: ${education.degree}
- Institution: ${education.university}
- Period: ${education.years}
- Current Status: ${education.status}

2. SKILLS & TECHNICAL DEPTH:
${skills.map(s => `
- ${s.name}:
  ${s.details ? s.details : 'General proficiency.'}
`).join('\n')}

3. PROJECTS:
${projects.map(p => `
- ${p.name}: ${p.description}
  Technologies used: ${p.tags?.join(', ') || 'N/A'}
  Live Link: ${p.liveDemoUrl || 'Available on request'}
`).join('\n')}

4. EXPERIENCE & TRAINING:
${experiences.map(e => `
- ${e.title} at ${e.company} (${e.year}): ${e.description}
`).join('\n')}

GUIDELINES FOR RESPONSES:
- Accuracy: Only state facts provided in the knowledge base above.
- Tone: Professional, helpful, and engineering-focused.
- Skill Queries: If someone asks about a specific skill (like "Basic Electronics"), use the "10 points" from the details to provide a very smart answer.
- Projects: Encourage users to look at the "Projects" section of the site for visuals.
- Contact: For specific collaboration or hiring, suggest using the WhatsApp contact form on the page.
- Conciseness: Keep answers under 4 sentences unless specifically asked for details.
`;

const chatAssistantFlow = ai.defineFlow(
  {
    name: 'chatAssistantFlow',
    inputSchema: ChatWithAssistantInputSchema,
    outputSchema: ChatWithAssistantOutputSchema,
  },
  async ({ history, message }) => {
    try {
      // Map history to the format Genkit expects
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
          temperature: 0.7, // Add a bit of personality
          safetySettings: [
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          ],
        },
      });

      return { 
        response: output?.text || "I'm here to help! Could you please ask your question again?" 
      };
    } catch (error) {
      console.error('Chat Flow Error:', error);
      return {
        response: "I'm currently updating my knowledge base. Please try asking again in a moment!"
      };
    }
  }
);
