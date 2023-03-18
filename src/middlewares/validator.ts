import { NextFunction, Request, Response } from "express";
import { AnyZodObject} from "zod";
const validate=(schema:AnyZodObject)=>(req:Request,res:Response,next:NextFunction)=>{
try {
schema.parse({
    body:req.body,
    query:req.query,
    params:req.params
})
} catch (e:any) {
return res.status(500).json({ success: false, message: "data error", issue: e.issues ,err:e})
}
}