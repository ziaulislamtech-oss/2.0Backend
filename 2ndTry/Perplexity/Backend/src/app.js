import express from 'express'
import authRouter from './routes/auth.route.js'
import cors from 'cors'
import morgan from 'morgan'
import chatRouter from './routes/chat.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

// API routes
app.use('/api/auth', authRouter)
app.use('/api/chat', chatRouter)

// React frontend
app.use(express.static(path.join(__dirname, '../public')))

// React Router fallback
app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

export default app