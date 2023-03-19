import { Application, NextFunction, Request, Response} from "express";
import createHttpError from "http-errors";
import { userRouter } from "./route";
export default function routes(app:Application){

app.use("/users",userRouter)
  app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound())
})
}
