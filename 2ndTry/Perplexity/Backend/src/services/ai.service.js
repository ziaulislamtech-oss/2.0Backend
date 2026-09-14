import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { AIMessage, HumanMessage, SystemMessage, tool, createAgent } from 'langchain'

import * as z from 'zod'
import { searchInternet } from "./internet.service.js";

const searchInternetTool = tool(
    searchInternet,
    {
        name: "searchInternet",
        description: 'Use this tool whenever the user asks for latest information, current events, news, weather, sports scores, or any information that requires searching the internet.',
        schema: z.object({
            query: z.string().describe("The search query to look up on the internet")
        })
    }
)

const gemniModel = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    apiKey: process.env.GEMNI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

// Single source of truth for what models exist, their display names,
// and the agent built on top of each. Frontend never sees "gemini"/"mistral" —
// only the key + label from getAvailableModels().
const MODEL_REGISTRY = {
    nova: {
        label: "Nova",
        description: "Fast responses, great for quick questions",
        agent: createAgent({
            model: mistralModel,
            tools: [searchInternetTool]
        })
    },
    atlas: {
        label: "Atlas",
        description: "Stronger reasoning for complex questions",
        agent: createAgent({
            model: gemniModel,
            tools: [searchInternetTool]
        })
    }
}

const DEFAULT_MODEL_KEY = "atlas"

function getAgent(modelKey) {
    return (MODEL_REGISTRY[modelKey] || MODEL_REGISTRY[DEFAULT_MODEL_KEY]).agent
}

export function getAvailableModels() {
    return Object.entries(MODEL_REGISTRY).map(([key, { label, description }]) => ({
        key,
        label,
        description
    }))
}

export async function generateResponse(messages, modelKey = DEFAULT_MODEL_KEY) {

    const agent = getAgent(modelKey)

    const response = await agent.invoke({
        messages: messages.map(msg => {
            if (msg.role == 'user') {
                return new HumanMessage(msg.content)
            } else if (msg.role == 'ai') {
                return new AIMessage(msg.content)
            }
        })
    })

    return response.messages[response.messages.length - 1].text;
}

export async function generateChatTitle(message) {

    try {
        const response = await mistralModel.invoke([
            new SystemMessage(`
                You are a helpful assistant that generates concise and descriptive titles for chat conversations.
                User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic
                `),
            new HumanMessage(`
                    Generate a title for a chat conversation based on the following first message:
                    "${message}"
                    `)
        ])

        return response.text
    } catch (err) {
        console.error("generateChatTitle failed, falling back to heuristic title:", err?.message || err)
        // Fallback: don't let a rate-limited/unavailable title provider block chat creation.
        const words = message.trim().split(/\s+/).slice(0, 6).join(" ")
        return words.length < message.trim().length ? `${words}…` : words
    }
}