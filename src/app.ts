import express, {
  Application,
  ErrorRequestHandler,
} from "express"
import helmet from "helmet"
import cors from "cors"
import { z } from "zod"
import routes from "./routes"
const app:Application= express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(cors())
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    res.status(400)
 
    res.json({ success: false, message: "data error", issue: err.issues })
  } else {
    res.status(err.status ?? 500)
    res.json({
      success: false,
      message: err.message ?? "failed",
    })
  }
}
routes(app)
app.use(errorHandler)
export default app