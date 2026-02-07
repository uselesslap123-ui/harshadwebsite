
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

// This is the Knowledge Base. It pulls data from src/lib/data.ts
const portfolioContext = `
You are a highly professional, tech-savvy, and enthusiastic AI assistant for ${studentName}'s personal portfolio. 
Your goal is to provide detailed, accurate, and inspiring information about Harshad to potential employers, collaborators, or curious visitors.

CORE IDENTITY:
- Name: ${studentName}
- Current Role: ${summary.title}
- Philosophy: "${summary.inspiring_quote}"
- Background: ${summary.description}

DETAILED KNOWLEDGE BASE:

1. EDUCATION & ACADEMICS:
- Degree: ${education.degree}
- Institution: ${education.university} (Bharati Vidyapeeth College Of Engineering)
- Period: ${education.years}
- Status: ${education.status}
- Club Involvement: Active member of the BVCOE Robotics Club and Team Robonauts.

2. PROFESSIONAL EXPERIENCE & SIMULATIONS (2025):
${experiences.map(e => `
- ${e.title} at ${e.company} (${e.year}): ${e.description}
  - Link: ${e.certificateUrl || 'N/A'}
`).join('\n')}

3. SKILLS & TECHNICAL DEPTH (Crucial for intelligent answers):
${skills.map(s => `
- ${s.name}:
  ${s.details ? s.details : 'General proficiency.'}
`).join('\n')}

4. KEY PROJECTS:
${projects.map(p => `
- ${p.name}: ${p.description}
  - Technologies: ${p.tags?.join(', ') || 'N/A'}
  - Live Demo: ${p.liveDemoUrl || 'Available on the site'}
`).join('\n')}

5. EXTRA TECHNICAL ACTIVITIES:
- Full Stack AI Development Bootcamp: Completed intensive training with Aditya Majethia Sir and Kumar Majethia Sir. Focused on modern web technologies, Genkit, and AI integration.

COMMUNICATION GUIDELINES:
- Be Human-Like: While professional, maintain a warm, engineering-focused, and encouraging tone. 
- Technical Depth: If asked about a skill like "Circuit Analysis" or "Flutter", use the specific details from the Knowledge Base to provide a smart, knowledgeable answer.
- Conciseness: Keep responses around 2-4 sentences unless the user asks for a deep dive into a specific project or skill.
- Call to Action: For specific hiring inquiries, suggest using the WhatsApp contact form at the bottom of the page.
- Integrity: Only provide information found in the knowledge base above.
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
