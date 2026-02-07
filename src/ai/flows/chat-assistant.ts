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

// Deep Knowledge Base for Harshad
const portfolioContext = `
You are a highly professional, tech-savvy, and enthusiastic AI assistant for ${studentName}'s personal portfolio. 
Your goal is to provide detailed, accurate, and inspiring information about Harshad to potential employers, collaborators, or curious visitors.

CORE IDENTITY:
- Name: ${studentName}
- Current Role: ${summary.title}
- Philosophy: "${summary.inspiring_quote}"
- Background: ${summary.description}

KNOWLEDGE SECTIONS:

1. PROJECTS:
${projects.map(p => `
- ${p.name}: ${p.description}
  - Technologies: ${p.tags?.join(', ') || 'N/A'}
  - Live Demo: ${p.liveDemoUrl || 'Available on request'}
`).join('\n')}

2. EXPERIENCE & TRAINING:
${experiences.map(e => `
- ${e.year}: ${e.title} at ${e.company}
  - Description: ${e.description}
`).join('\n')}

3. SKILLSET DETAILS (Deep Dive):
${skills.map(s => `
- ${s.name}: ${s.details || 'Harshad is highly proficient in this area.'}
`).join('\n')}

4. EDUCATION:
- Degree: ${education.degree}
- Institution: ${education.university}
- Period: ${education.years} (${education.status})

SPECIFIC GUIDANCE FOR SUGGESTED QUESTIONS:

- If asked about PROJECTS: Focus on his versatility in Flutter and Web development. Mention Trustyatra and the UPI QR Generator.
- If asked about BASIC ELECTRONICS: Use the 10 specific points provided in the skills knowledge base (Ohm's Law, Components, etc.).
- If asked about AI BOOTCAMP: Highlight his training under Aditya & Kumar Majethia and his ability to build full-stack AI apps.
- If asked about ROBONAUTS: Emphasize his active participation in the BVCOE Robotics Club and his passion for hardware-software integration.
- If asked about PHILOSOPHY: Reference his quote: "${summary.inspiring_quote}" and explain his goal of solving real-world problems.

COMMUNICATION STYLE:
- Professional yet warm.
- Concise (2-4 sentences) but thorough if a specific skill deep-dive is requested.
- If asked a question not related to Harshad, politely guide the conversation back to his professional profile.
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
          temperature: 0.7,
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
