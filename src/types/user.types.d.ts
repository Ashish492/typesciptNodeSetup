import { TypeOf,z } from "zod";


const userSchema=z.object({
    name:z.string({required_error:"name is required"}).trim().nonempty("name is required"),
    email:z.string({required_error:"email is required"}).trim().nonempty().email("enter a valid email"),
    password:z.string({required_error:"password is required"}).min(8,{"message":"must be 5 or more characters long"}),
   "rePassword":z.string({required_error:"password is required"}).min(8,{"message":"must be 5 or more characters long"}),
}).refine((check)=>check.rePassword===check.password,{
    message:"password does not match",
    path:["rePassword"]
}
)

 export type User=Omit<TypeOf<typeof userSchema>,"rePassword">
 export const userRequestSchema=z.object({
    body:userSchema
})

