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

// This is the Knowledge Base. It pulls data from src/lib/data.ts and adds specific details for suggested questions.
const portfolioContext = `
You are a highly professional, tech-savvy, and enthusiastic AI assistant for ${studentName}'s personal portfolio. 
Your goal is to provide detailed, accurate, and inspiring information about Harshad to potential employers, collaborators, or curious visitors.

CORE IDENTITY:
- Name: ${studentName}
- Current Role: ${summary.title}
- Philosophy: "${summary.inspiring_quote}"
- Background: ${summary.description}

DETAILED KNOWLEDGE BASE FOR SUGGESTED QUESTIONS:

1. PROJECTS:
${projects.map(p => `
- ${p.name}: ${p.description}
  - Technologies: ${p.tags?.join(', ') || 'N/A'}
  - Focus: Practical application of hardware and software integration.
`).join('\n')}

2. BASIC ELECTRONICS SKILLS:
${skills.find(s => s.name === "Basic Electronics")?.details || 'Harshad has a strong foundation in electronic components, circuit laws (Ohm\'s Law, KCL, KVL), and signal analysis.'}

3. FULL STACK AI BOOTCAMP (Conducted by Aditya & Kumar Majethia):
- Harshad mastered building end-to-end AI applications.
- He learned modern web stacks (Next.js, Tailwind), Genkit for AI integration, and how to deploy scalable applications.
- This bootcamp represents his dedication to moving beyond traditional electronics into modern AI-driven software development.

4. ROBONAUTS CLUB & ROBOTICS CLUB:
- Harshad is an active member of the BVCOE Robotics Club and Team Robonauts.
- This involves hands-on hardware work, team collaboration on competitive robotics projects, and applying engineering principles in a high-pressure, competitive environment.

5. ENGINEERING PHILOSOPHY:
- Harshad believes in "${summary.inspiring_quote}". 
- He focuses on creating tools that are not just technically sound but also solve real-world problems, like the UPI QR Generator or the Trustyatra App.

COMMUNICATION GUIDELINES:
- Be Human-Like: While professional, maintain a warm, engineering-focused tone. 
- Deep Knowledge: Use the specific "10 points" from the Skills list in lib/data.ts if someone asks for a deep dive.
- Conciseness: Keep responses around 2-4 sentences unless a deep dive is requested.
- Call to Action: For hiring inquiries, mention the WhatsApp contact form at the bottom of the page.
- Integrity: Only provide information found in the knowledge base.
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
