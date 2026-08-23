import { initializeSocketConnection } from "../service/chat.socket"
import {useDispatch} from 'react-redux'
import {setChats,setCurrentChatId,setLoading,setError, createNewChat, addNewMessage,addMessage} from '../chat.slice'
import { getChats, getMessages, sendMessage } from "../service/chat.api"

export const useChat=()=>{

    const dispatch = useDispatch()

    const handleSendMessage = async({message,chatId})=>{

       const data = await sendMessage({message,chatId})
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

       dispatch(setCurrentChatId(chat._id))
    }

    const handleGetChats = async()=>{

        dispatch(setLoading(true))

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


    

    return{
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChats
    }
}