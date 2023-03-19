import express, {
  Application,
  ErrorRequestHandler
} from "express"
import helmet from "helmet"
import cors from "cors"
import {  } from "zod"
import routes from "./routes"
import morgan from "morgan"
import { logger } from "./utils"
const app:Application= express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    logger.error(err.cause)
    res.status(err?.cause?.statusCode ?? 500)
    res.json({
      success: false,
      message: err.message ?? "failed",
    })
  }
// }
routes(app)
app.use(errorHandler)
export default app