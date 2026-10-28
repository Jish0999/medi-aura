import { GoogleGenAI } from "@google/genai";
import type { Message } from "../types";
import systemPrompt from "./systemPrompt";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function getAIResponse(messages: Message[]) {

  // 👇 Add Step 2 here
    const chatHistory = [
    {
        role: "user",
        parts: [
        {
            text: systemPrompt,
        },
        ],
    },

    ...messages.map((message) => ({
        role: message.sender === "user" ? "user" : "model",
        parts: [
        {
            text: message.text,
        },
        ],
    })),
    ];

  // We will use chatHistory in the next step
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: chatHistory,
  });

  return response.text;
}