import { omit } from "lodash";
import { insertUser } from "../service";
import { CustomRouteFunction } from "../types/customExpress.types";
import { User } from "../types/user.types";

export const createUser:CustomRouteFunction<User> = async (req,res) => {

const user =await insertUser(omit(req.body,"rePassword"))
res.json(omit(user.toJSON(),["password","__v"]))
}
export const getUser:CustomRouteFunction=async(_,res)=>{

}