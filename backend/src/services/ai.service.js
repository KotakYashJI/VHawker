import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

export const ImagetoText = async (content) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content
    });

    console.log(response.text);
}