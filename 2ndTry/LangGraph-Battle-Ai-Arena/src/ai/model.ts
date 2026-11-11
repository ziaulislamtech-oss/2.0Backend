import { ChatGoogle } from "@langchain/google";
import { config } from "../config/config.js";
import { ChatCohere } from "@langchain/cohere";

import { ChatMistralAI } from "@langchain/mistralai";

import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";

export const mistralModel = new ChatMistralAI({
    model: "mistral-small-2603",
    apiKey : config.MISTRAL_API_KEY
});

export const geminiModel = new ChatGoogle({
    model: 'gemini-flash-latest',
    apiKey: config.GEMINI_API_KEY
});

export const cohereModel = new ChatCohere({
    model : 'command-a-03-2025',
    apiKey : config.COHERE_API_KEY
})

export const openAiModel = new ChatOpenAI({
    model : "gpt-4.1-mini",
    apiKey : config.OPEN_AI_API_KEY
})
export const groqModel = new ChatGroq({
    model : 'openai/gpt-oss-120b',
    apiKey : config.GROQ_API_KEY
})