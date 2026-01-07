import { GoogleGenAI } from "@google/genai";
import { ResumeData } from "../types";

const GEMINI_API_KEY = process.env.API_KEY || '';

export const auditResume = async (data: ResumeData): Promise<string> => {
  if (!GEMINI_API_KEY) {
    return "error: no api key detected. cannot perform proof of work check.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    
    // Construct a focused prompt based on the specific constraints
    const prompt = `
      act as a harsh but helpful web3 recruiter and portfolio auditor.
      analyze this candidate profile:
      
      name: ${data.fullName}
      bio: ${data.bio}
      experience: ${data.experience.map(e => `${e.role} at ${e.company} (${e.isWeb3 ? 'web3' : 'legacy'})`).join(', ')}
      skills: ${data.skills.map(s => s.name).join(', ')}

      your task:
      1. give 3 specific, actionable tips to improve their "web3 vibe" and employability.
      2. focus on moving from "airdrop farming" to "builder" mentality.
      3. identify gaps in their on-chain credentials.

      constraints:
      - output must be strictly lowercase.
      - do not use quotation marks anywhere.
      - use minimal punctuation (commas and periods only).
      - use web3 native terms (wagmi, shipping, on-chain, protocol, dao, etc).
      - keep it brief. max 150 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Fast response
      }
    });

    return response.text || "network congestion. could not retrieve audit.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "transaction failed. ai node offline.";
  }
};