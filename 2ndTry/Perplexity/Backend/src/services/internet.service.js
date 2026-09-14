import {tavily as Tavily} from '@tavily/core'

const tavily = new Tavily({
    apiKey : process.env.TAVILY_API_KEY
})

export const searchInternet = async ({query})=>{

    return response = await tavily.search(query,{
        maxResults : 5,
        searchDepth : 'advanced'
    })
}