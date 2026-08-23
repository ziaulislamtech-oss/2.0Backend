import {configureStore} from '@reduxjs/toolkit'
import  authReducer from '../Features/Auth/auth.slice'
import chatReducer from '../Features/chat/chat.slice'

export const store = configureStore({

    reducer : {
        auth : authReducer,
        chat : chatReducer
    }
})