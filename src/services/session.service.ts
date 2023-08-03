import { FilterQuery, UpdateQuery } from 'mongoose'
import { SessionModel, SessionType } from '@models'
import { Session } from '@types'
import { runService } from '@utils'
export const createSession = (session: Session) => {
  return runService(async () => (await SessionModel.create(session)).toObject(), 'unable to create session')
}
export const findSession = (query: FilterQuery<SessionType>) => {
  return SessionModel.find(query).lean()
}
export const updateSession = async (query: FilterQuery<SessionType>, update: UpdateQuery<SessionType>) => {
  return runService(async () => SessionModel.updateMany(query, update))
}
export const invalidSession = async (sessionId: string) => {
  return runService(async () => SessionModel.findByIdAndUpdate(sessionId, { valid: false }))
}
