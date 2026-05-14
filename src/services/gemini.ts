import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getAIResponse = async (prompt: string, systemInstruction?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are an expert Moroccan educational assistant for 2nd year Baccalaureate students. Answer in French or Arabic as appropriate. Help them understand lessons, solve exercises, and prepare for exams.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const solveExercise = async (exerciseText: string) => {
  const systemInstruction = "You are a teacher helping a 2Bac student. Solve the following exercise step-by-step, explaining the logic clearly in French. Use LaTeX for mathematical formulas.";
  return getAIResponse(exerciseText, systemInstruction);
};
