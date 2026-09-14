import {createSlice} from '@reduxjs/toolkit'

const chatSlice = createSlice({

    name : 'chat',
    initialState : {

        chats : {},
        currentChatId : null,
        isLoading : false,
        error : null,

        // Model selection
        availableModels : [],   // [{ key, label, description }]
        selectedModelKey : 'atlas'

    },

    reducers : {

        createNewChat : (state,action)=>{

            const {chatId,title} = action.payload
            state.chats[chatId] ={
                id : chatId,
                title,
                messages : [],
                lastUpdated : new Date().toString()
            }
            state.currentChatId = chatId
        },
        addNewMessage : (state,action)=>{

            const {chatId,content,role} =action.payload
            state.chats[chatId].messages.push({content,role})
        },
        addMessage : (state,action)=>{
            const {chatId,messages} = action.payload
            state.chats[chatId].messages.push(...messages)
        },
        setChats : (state,action)=>{
            state.chats = action.payload
        },
        setCurrentChatId : (state,action)=>{
            state.currentChatId = action.payload
        },
        setLoading : (state,action)=>{
            state.isLoading = action.payload
        },
        setError : (state,action)=>{

            state.error = action.payload
        },
        setAvailableModels : (state,action)=>{
            state.availableModels = action.payload
        },
        setSelectedModel : (state,action)=>{
            state.selectedModelKey = action.payload
        }
    }
})

export const {
    setChats,
    setCurrentChatId,
    setLoading,
    setError,
    createNewChat,
    addNewMessage,
    addMessage,
    setAvailableModels,
    setSelectedModel
} = chatSlice.actions
export default chatSlice.reducer