
import { GoogleGenAI, Type } from "@google/genai";
import { Threat, Priority, CombatMode, SwarmPerspective } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  async analyzeMission(objective: string): Promise<{ unit: string; resources: string[]; criteria: string; perspectives: SwarmPerspective[] }> {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the mission objective: "${objective}". 
      1. Choose the best tactical unit from: [Market Intelligence Unit, Build & Deploy Squadron, Growth Strike Team, Perimeter Security Battalion, Black Ops Revenue Unit, Treasury Management].
      2. List required resources.
      3. Provide 4 perspectives (CEO, CTO, Growth, Security) in Thai or English.
      Return in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            unit: { type: Type.STRING },
            resources: { type: Type.ARRAY, items: { type: Type.STRING } },
            criteria: { type: Type.STRING },
            perspectives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  agent: { type: Type.STRING },
                  view: { type: Type.STRING }
                },
                required: ["agent", "view"]
              }
            }
          },
          required: ["unit", "resources", "criteria", "perspectives"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async swarmDecision(problem: string, perspectives: string[]): Promise<{ decision: string; reasoning: string }> {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are the Supreme Commander. Decide on: "${problem}" based on: ${perspectives.join(", ")}. Return JSON with "decision" and "reasoning" (in Thai).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            decision: { type: Type.STRING },
            reasoning: { type: Type.STRING }
          },
          required: ["decision", "reasoning"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async scanThreats(): Promise<Threat[]> {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Scan for 3 market threats (competitor, regulation, tech, crash). Describe each in Thai.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              severity: { type: Type.NUMBER },
              description: { type: Type.STRING }
            },
            required: ["type", "severity", "description"]
          }
        }
      }
    });
    const raw = JSON.parse(response.text);
    return raw.map((t: any, i: number) => ({ ...t, id: `threat-${Date.now()}-${i}` }));
  },

  async generateGuerrillaIdea(): Promise<{ name: string; goal: string }> {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate one AI business idea for guerrilla combat mode. Name and goal in Thai.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            goal: { type: Type.STRING }
          },
          required: ["name", "goal"]
        }
      }
    });
    return JSON.parse(response.text);
  }
};
