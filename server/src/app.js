import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import { env } from './config/env.js'
import { apiLimiter } from './middleware/rateLimit.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import { crud } from './routes/crud.js'
import authRoutes from './routes/auth.js'
import messageRoutes from './routes/messages.js'
import settingsRoutes from './routes/settings.js'
import uploadRoutes from './routes/upload.js'
import Dish from './models/Dish.js'
import Recipe from './models/Recipe.js'
import Review from './models/Review.js'

const app = express()
app.set('trust proxy', 1)

app.use(helmet())
app.use(
  cors({
    origin: env.CLIENT_ORIGIN.split(',').map((s) => s.trim()),
    credentials: true,
  })
)
app.use(express.json({ limit: '200kb' }))
app.use(cookieParser())
app.use(mongoSanitize())
app.use('/api', apiLimiter)

app.get('/api/health', (_req, res) => res.json({ ok: true, status: 'healthy', timestamp: new Date() }))
app.use('/api/auth', authRoutes)
app.use('/api/dishes', crud(Dish, { publicFilter: { visible: true }, filters: ['category', 'featured'] }))
app.use('/api/recipes', crud(Recipe, { publicFilter: { visible: true }, filters: ['category'] }))
app.use('/api/reviews', crud(Review, { publicFilter: { visible: true } }))
app.use('/api/settings', settingsRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/upload', uploadRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
