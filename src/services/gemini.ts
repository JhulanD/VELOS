import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateOutreachMessage(candidateName: string, roleTitle: string, company: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a high-converting, personalized recruitment outreach message for a candidate named ${candidateName} for a ${roleTitle} position at ${company}. Keep it professional but modern, under 100 words. Mention that we are an AI-native agency using Talos.`,
      config: {
        systemInstruction: "You are an elite tech recruiter known for extremely high response rates. Your tone is direct, premium, and human-sounding. Never use recruitment clichés."
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having trouble connecting to my creative brain right now. Please try again or use a template!";
  }
}

export async function summarizeInterviewNotes(notes: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize the following interview notes into a concise, 3-bullet executive summary and a recommendation (Yes/No/Maybe). Notes: ${notes}`,
      config: {
        systemInstruction: "You are an expert recruitment analyst. You extract the signal from the noise and provide clear hiring recommendations."
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Could not summarize at this time.";
  }
}

export async function generateCandidateSummary(candidateName: string, role: string, skills: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a sharp, professional 1-paragraph summary for a candidate named ${candidateName} who is a ${role}. Key skills: ${skills.join(', ')}. Focus on their potential market value and cultural fit for high-performance tech teams. Under 60 words.`,
      config: {
        systemInstruction: "You are an elite talent scout. Your summaries are punchy, insightful, and help hiring managers make fast decisions. Avoid fluff."
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Professional summary unavailable at this moment.";
  }
}
