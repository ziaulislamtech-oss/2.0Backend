import { config as loadEnv } from "dotenv"
import { readonly } from "zod"
loadEnv()

// Gemini-api-key
// mistral-api-key
// Cohere-api-key

type CONFIG = {

    readonly GEMINI_API_KEY: string
    readonly MISTRAL_API_KEY: string
    readonly COHERE_API_KEY: string
    readonly OPEN_AI_API_KEY: string
    readonly GROQ_API_KEY:string
}

export const config: CONFIG = {

    GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY ?? "",
    COHERE_API_KEY: process.env.COHERE_API_KEY ?? "",
    OPEN_AI_API_KEY : process.env.OPEN_AI_API_KEY ??"",
    GROQ_API_KEY:process.env.GROQ_API_KEY??""
}