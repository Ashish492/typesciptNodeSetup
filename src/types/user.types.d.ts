import { TypeOf, z } from "zod";

const userSchema=z.object({
    name:z.string({required_error:"name is required"}).trim().nonempty("name is required"),
    email:z.string({required_error:"email is required"}).trim().nonempty().email("enter a valid email"),
    password:z.string({required_error:"password is required"}).min(8,{"message":"must be 5 or more characters long"}),
   "rePassword":z.string({required_error:"password is required"}).min(8,{"message":"must be 5 or more characters long"}),
}).refine(check=>check.password===check.rePassword,{
    message:"password must be same",
    path:"rePassword"
})

type User=TypeOf<typeof userSchema>
type UserRequest={
    body:User
}