import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { deleteChat, getChats, getMessages, getModels, sendMessage } from "../controllers/chat.controller.js";

const chatRouter = Router()


chatRouter.post('/message',authUser,sendMessage)
chatRouter.get('/getchats',authUser,getChats)
chatRouter.get('/models',authUser,getModels)
chatRouter.get('/:chatId/messages',authUser,getMessages)
chatRouter.delete('/delete/:chatId',authUser,deleteChat)

export default chatRouter