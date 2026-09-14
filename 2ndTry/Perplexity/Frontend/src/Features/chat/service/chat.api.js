import axios from 'axios'

   const api = axios.create({
       baseURL: import.meta.env.VITE_API_URL || '',
       withCredentials: true
   })

export const sendMessage = async({message,chatId,modelKey})=>{

    const response = await api.post('/api/chat/message',{message, chat : chatId, modelKey})

    return response.data
}

export const getChats = async ()=>{

    const response = await api.get('/api/chat/getchats')
    return response.data
}

export const getMessages = async (chatId)=>{

    const response = await api.get(`/api/chat/${chatId}/messages`)
    return response.data
}

export const getModels = async ()=>{

    const response = await api.get('/api/chat/models')
    return response.data
}