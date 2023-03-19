import { UserModel } from "../model";
import { User } from "../types/user.types";
export  const insertUser= async (user:User)=>{
try {
   const result= await UserModel.create(user)

    return result
} catch (error:any) {

    throw new Error(error?.message??"unable to  create user",{cause:{
        statusCode:500,
        error
    }})
}
}
export const getUsers = async () => {
    try {
      return   await UserModel.find().select({password:0})
    } catch (error:any) {
        throw new Error("internal server Error",{
            cause:{
                error
            }
        })
    }
}
