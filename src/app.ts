import express, { Application, ErrorRequestHandler } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { ZodError } from 'zod'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import routes from './routes'
import { initializePassport } from './middleware'
import { logger } from './utils'
const app: Application = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(initializePassport())
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err)
  if (err instanceof ZodError) {
    res.status(400)
    return res.json(err.issues)
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('Invalid token')
  }
  res.status(err?.statusCode ?? err?.code ?? 500)
  return res.json({
    success: false,
    message: err.message ?? 'failed',
  })
}
routes(app)
app.use(errorHandler)
export default app
