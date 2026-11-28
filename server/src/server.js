import app from './app.js'
import { connectDb } from './config/db.js'
import { env } from './config/env.js'

async function bootstrap() {
  try {
    await connectDb()
    app.listen(env.PORT, () => {
      console.log(`Server listening on port ${env.PORT} in ${env.NODE_ENV} mode`)
      console.log(`API Health: http://localhost:${env.PORT}/api/health`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

bootstrap()
