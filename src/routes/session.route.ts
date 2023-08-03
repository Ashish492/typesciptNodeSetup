import { Router } from 'express'
import { sessionRequestSchema } from '@types'
import { createSessionHandler, deleteSessionHandler, getSessionHandler, issueToken } from '@controllers'
import { customRouteFunction } from '@utils'
import { auth, validate } from '@middlewares'
export const sessionRouter = Router()
sessionRouter
  .route('/')
  .post(validate(sessionRequestSchema), customRouteFunction(createSessionHandler))
  .get(auth(), customRouteFunction(getSessionHandler))
sessionRouter.route('/delete').patch(auth(), customRouteFunction(deleteSessionHandler))
sessionRouter.route('/token').get(customRouteFunction(issueToken))
