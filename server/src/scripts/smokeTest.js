import app from '../app.js'
import Dish from '../models/Dish.js'
import Recipe from '../models/Recipe.js'
import Review from '../models/Review.js'
import Message from '../models/Message.js'
import Settings from '../models/Settings.js'
import Admin from '../models/Admin.js'
import { env } from '../config/env.js'

console.log('--- Chef Portfolio Server Smoke Test ---')
console.log(`Node Environment : ${env.NODE_ENV}`)
console.log(`Port Configured   : ${env.PORT}`)
console.log(`Client Origin     : ${env.CLIENT_ORIGIN}`)

const models = [Dish, Recipe, Review, Message, Settings, Admin]
console.log(`Mongoose Models   : ${models.length} registered (${models.map((m) => m.modelName).join(', ')})`)

if (!app || typeof app.listen !== 'function') {
  console.error('❌ Express app instance is invalid!')
  process.exit(1)
}

console.log('✅ Express app and API routes initialized successfully.')
console.log('--- Smoke Test Passed! ---')
