import { initializeSocketConnection } from "../service/chat.socket"
import {useDispatch, useSelector} from 'react-redux'
import {setChats,setCurrentChatId,setLoading,setError, createNewChat, addNewMessage,addMessage, setAvailableModels, setSelectedModel} from '../chat.slice'
import { getChats, getMessages, sendMessage, getModels } from "../service/chat.api"

export const useChat=()=>{

    const dispatch = useDispatch()
    const selectedModelKey = useSelector((state)=>state.chat.selectedModelKey)

    const handleSendMessage = async({message,chatId})=>{

       dispatch(setLoading(true))
       dispatch(setError(null))

       try {
           const data = await sendMessage({message,chatId,modelKey : selectedModelKey})
           const {chat,aiMessage} = data

           if(!chatId){
            dispatch(createNewChat({

                chatId : chat._id,
                title : chat.title
            }))
           }

           dispatch(addNewMessage({
               chatId : chatId || chat._id,
               content : message,
               role : "user"
           }))

           dispatch(addNewMessage({
             chatId : chatId || chat._id,
             content : aiMessage.content,
             role : aiMessage.role
           }))

           dispatch(setCurrentChatId(chatId || chat._id))
       } catch (err) {
           const status = err?.response?.status
           const message = status === 429
               ? "Too many requests right now — please wait a moment and try again or you can switch to another model"
               : err?.response?.data?.detail || "Something went wrong sending your message."
           dispatch(setError(message))
           throw err
       } finally {
           dispatch(setLoading(false))
       }
    }

    const handleGetChats = async()=>{

        dispatch(setLoading(true))

        try {
            const data = await getChats()

            console.log('chats : ',data)
            const {chats} = data
            dispatch(setChats(chats.reduce((acc,chat)=>{
                acc[chat._id] = {
                    id : chat._id,
                    title : chat.title,
                    messages : [],
                    lastUpdated : chat.updatedAt
                }
                return acc
            },{})))
        } finally {
            dispatch(setLoading(false))
        }

    }

    const handleOpenChats = async (chatId,chats)=>{

        if(chats[chatId]?.messages.length ===0){

            const data = await getMessages(chatId)
            const {messages} = data
            console.log('messasges : ',messages)

            const formatedMessages= messages.map((msg)=>({
                content : msg.content,
                role : msg.role
            }))


            dispatch(addMessage({
                chatId,
                messages : formatedMessages
            }))
        }

        dispatch(setCurrentChatId(chatId))
    }

    const loadAvailableModels = async ()=>{

        const data = await getModels()
        const {models} = data
        dispatch(setAvailableModels(models))
    }

    const handleModelChange = (modelKey)=>{
        dispatch(setSelectedModel(modelKey))
    }


    return{
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChats,
        loadAvailableModels,
        handleModelChange,
        selectedModelKey
    }
}