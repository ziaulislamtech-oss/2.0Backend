import { MistralAI } from "@langchain/mistralai";
import "dotenv/config";
import readline from 'readline/promises'
import { HumanMessage } from "@langchain/core/messages";

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const mistralModel  = new MistralAI({
    model : "mistral-small-latest",
    apiKey : process.env.MISTRAL_API_KEY
})

const messages = []

while(true){


    const userInput = await rl.question('\x1b[32m🧑 You > \x1b[0m')

    messages.push(new HumanMessage(userInput))
    console.log("\n🤖 Thinking...\n");


   const response = await mistralModel.invoke(messages)

   messages.push(response)

   console.log('\x1b[34m🤖 AI >\x1b[0m ',response)
}