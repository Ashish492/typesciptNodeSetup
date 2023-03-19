import { getModelForClass, prop } from "@typegoose/typegoose"
import { User as IUser } from "../types"
class User  implements IUser{
 @prop({required:[true,"email is required"],unique:true})
 email:string
 @prop({required:[true,"name is required"]})
 name:string
@prop({required:[true,"password is required"],min:[8,"password must have minimum 8 characters"]})
 password:string
}
export const UserModel=getModelForClass(User)