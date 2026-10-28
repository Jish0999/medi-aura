
import { GoogleGenAI } from "@google/genai";
import type { Message } from "../types";
import systemPrompt from "./systemPrompt";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export async function getAIResponse(messages: Message[]) {
  if (!apiKey) {
    return "The AI assistant is temporarily unavailable. Please try again later.";
  }

  const ai = new GoogleGenAI({ apiKey });

  const chatHistory = [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    ...messages.map((message) => ({
      role: message.sender === "user" ? "user" : "model",
      parts: [{ text: message.text }],
    })),
  ];

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: chatHistory,
  });

  return response.text;
}
