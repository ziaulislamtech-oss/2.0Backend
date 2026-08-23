import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { deleteChat, getChats, getMessages, sendMessage } from "../controllers/chat.controller.js";

const chatRouter = Router()


chatRouter.post('/message',authUser,sendMessage)
chatRouter.get('/getchats',authUser,getChats)
chatRouter.get('/:chatId/messages',authUser,getMessages)
chatRouter.delete('/delete/:chatId',authUser,deleteChat)

export default chatRouter