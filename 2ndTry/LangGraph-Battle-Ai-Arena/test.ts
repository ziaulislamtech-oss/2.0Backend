import runBattleArena from './src/ai/graph.ai.js'

const problem = "what is artificial intellegence?";

const main = async()=>{

    try {
        const result = await runBattleArena(problem);
        console.log("Ai Battle Arena Result : ");
        console.dir(result,{depth: null})
    }
    catch(error){
        console.log("Errors:",error)
    }
}
main()