import express from 'express'
import authRouter from './routes/auth.route.js'
import cors from 'cors'
import morgan from 'morgan'
import chatRouter from './routes/chat.route.js'
import cookieParser from 'cookie-parser'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
console.log("File Name is : ",__filename)
const __dirname = path.dirname(__filename)
console.log("DIR Name is : ",__dirname)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))

const allowedOrigins = [
    "http://localhost:5173",
    "https://perplexity-tt0i.onrender.com",
    "http://localhost:3000" // apna actual deployed frontend URL yahan confirm/update karein
]

app.use(cors({
    origin: function (origin, callback) {
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

// React frontend — with correct caching so a redeploy's new file hashes
// are picked up immediately instead of serving a stale cached index.html
// that points at asset filenames which no longer exist.
app.use(express.static(path.join(__dirname, '../public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('index.html')) {
            // Always revalidate index.html — it's small and changes every deploy
            res.setHeader('Cache-Control', 'no-cache')
        } else {
            // Hashed assets (index-XXXXXXXX.js/css) never change content for a
            // given filename, so they're safe to cache aggressively/forever.
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        }
    }
}))

// React Router fallback
// Change this line from app.get('*', ...) to:
app.get('*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})



export default app