import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const gemniModel = new ChatGoogleGenerativeAI({

    model: "gemini-3.5-flash-lite",
    apiKey: process.env.GEMNI_API_KEY

});





export async function testAi(){

    try{
        const response =  await gemniModel.invoke("What is the capital of me")
        console.log("AI Response : ",response.content)
    }catch(err){
        console.error('Error calling gemni',err.message)
    }
    
}