import { Application, NextFunction, Request, Response} from "express";
import createHttpError from "http-errors";
export default function routes(app:Application){



  app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound())
})
}
