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

const allowedOrigins = [
    "http://localhost:5173",
    "https://perplexity-tt0i.onrender.com", // apna actual deployed frontend URL yahan confirm/update karein
]

app.use(cors({
    origin: function (origin, callback) {
        // same-origin ya non-browser requests (no Origin header) allow karein,
        // aur sirf allow-list mein maujood origins ko allow karein
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
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