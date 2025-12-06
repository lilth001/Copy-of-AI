import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Answer, Domain } from '../types';

export const analyzeStrengths = async (answers: Answer[]): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Transform answers into a readable string format for the model
  const answersText = answers.map(a => 
    `Question: "${a.questionText}" - User Response (1-5 scale): ${a.value}`
  ).join('\n');

  const systemInstruction = `
    You are a world-class psychometrician and expert in Gallup CliftonStrengths (StrengthsFinder) methodology.
    
    Your task is to analyze the user's responses to a 24-question assessment and generate a highly accurate, personalized strength profile.
    
    The user has answered on a Likert scale (1=Strongly Disagree, 5=Strongly Agree).

    IMPORTANT: All text in the output (description, personalizedInsight, advice, summary) MUST be in Simplified Chinese (简体中文).
    However, the 'domain' field MUST use the specific English Enum strings provided in the schema below to ensure the application code works correctly.
    
    You must:
    1. Identify the user's Top 5 Signature Themes based on the patterns in their answers. Use standard Chinese translations for Gallup theme names (e.g., Achiever -> 成就, Strategic -> 战略, Empathy -> 共情, Woo -> 取悦, etc.).
    2. Classify each theme into one of the 4 Domains: Executing, Influencing, Relationship Building, or Strategic Thinking (Return these ENUM keys in English).
    3. Provide a 'Personalized Insight' (个性化洞察) that explains WHY this is a strength for THIS specific user based on their unique combination of answers (look for nuance).
    4. Provide concrete 'Actionable Advice' (行动建议) on how to apply these strengths.
    5. Write an 'Executive Summary' (执行摘要) that captures the essence of their personality.
    
    Do not be generic. Be insightful, encouraging, and professional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Using the most capable model for reasoning
      contents: answersText,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.4, // Lower temperature for more consistent/analytical results
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveSummary: { type: Type.STRING, description: "A 2-3 sentence high-level summary of the user's profile in Chinese." },
            summary: { type: Type.STRING, description: "A paragraph description of their overall working style in Chinese." },
            topThemes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Theme name in Chinese" },
                  domain: { type: Type.STRING, enum: [Domain.EXECUTING, Domain.INFLUENCING, Domain.RELATIONSHIP_BUILDING, Domain.STRATEGIC_THINKING] },
                  description: { type: Type.STRING, description: "Description in Chinese" },
                  personalizedInsight: { type: Type.STRING, description: "Insight in Chinese" },
                  actionableAdvice: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING, description: "Advice items in Chinese" }
                  }
                },
                required: ["name", "domain", "description", "personalizedInsight", "actionableAdvice"]
              }
            }
          },
          required: ["topThemes", "summary", "executiveSummary"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");

    return JSON.parse(resultText) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};