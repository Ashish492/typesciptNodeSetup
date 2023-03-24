import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"
type basicFun = (req: Request, res: Response, next: NextFunction) => any
export function customRouteFunction(fn: basicFun) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}
export const runService=async<T>(fn:(...args:any[])=>T,msg?:string):Promise<T| void> =>{
     try {
        return await fn()
    } catch (error) {
     throw createHttpError(500,msg??"internal server Error",{cause:error})
    }
}