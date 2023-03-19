import { Router } from "express";
import { customRouteFunction } from "../utils";
import { createUser, getUser } from "../controller";
import { validate } from "../middleware";
import { userRequestSchema } from "../types/user.types";
export const userRouter=Router()
userRouter.route("/").post(validate(userRequestSchema) ,customRouteFunction(createUser)).get(customRouteFunction(getUser))
