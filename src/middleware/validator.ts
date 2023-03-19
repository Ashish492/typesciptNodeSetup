import { NextFunction, Request, Response } from "express";
import { AnyZodObject} from "zod";
import { logger } from "../utils";
export const validate=(schema:AnyZodObject)=>async (req:Request,res:Response,next:NextFunction)=>{
try {
 await schema.parseAsync({
    body:req.body,
    query:req.query,
    params:req.params
})
next()
} catch (e:any) {
    logger.info("jo")
return res.status(500).json(e.errors)
}
}