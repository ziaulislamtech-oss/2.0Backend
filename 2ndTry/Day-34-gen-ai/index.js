import { ChatMistralAI } from "@langchain/mistralai";
import "dotenv/config";
import readline from 'readline/promises'
import { HumanMessage,AIMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { sendEmail } from "./mail.service.js";
import {createAgent} from 'langchain'
import * as z from 'zod'
import { subscribe } from "diagnostics_channel";


const mistralModel  = new ChatMistralAI({
    model : "mistral-small-latest",
    apiKey : process.env.MISTRAL_API_KEY
})

const emailTool = tool(
    sendEmail,
    {
        name : "emailTool",
        description : "Use this tool to send an Email",
        schema : z.object({
            to : z.string().describe(`the recipient's email address`),
            html : z.string().describe(`html content of the email`),
            subject : z.string().describe(`The subject of the email`)
        })
    }
)

const agent = createAgent({
    model : mistralModel,  // it is the model we use for chat
    tools : [emailTool]
})

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})




const messages = []

while(true){


    const userInput = await rl.question('\x1b[32m🧑 You > \x1b[0m')

    messages.push(new HumanMessage(userInput))
    console.log("\n🤖 Thinking...\n");


   const response = await agent.invoke({messages})

   messages.push(response.messages[response.messages.length-1])

//    console.log('\x1b[34m🤖 AI >\x1b[0m ',response)
  console.log(response.messages[response.messages.length - 1].content)
}