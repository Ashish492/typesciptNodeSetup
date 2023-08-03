/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError } from 'zod'
import { User } from '@types'
import { ObjectId } from 'mongoose'
import createHttpError from 'http-errors'
import { pick } from 'lodash'
import { runService } from '@utils'
import { UserModel } from '@models'
export const insertUser = async (user: User) => {
  try {
    const result = await UserModel.create(user)
    return result
  } catch (error: unknown) {
    if ((error as any).code === 11000) {
      throw new ZodError([
        {
          code: 'custom',
          path: ['body', 'email'],
          message: 'email already taken',
        },
      ])
    }
    throw createHttpError(500, (error as Error)?.message ?? 'unable to  create user', {
      cause: {
        error,
      },
    })
  }
}
export const getUsers = async () => {
  return runService(async () => UserModel.find({}).hideVersion())
}
export const removeUser = async (id: ObjectId) => {
  return runService(async () => UserModel.findByIdAndDelete(id))
}
export const validatePassword = async ({ email, password }: Omit<User, 'name'>) => {
  const user = await UserModel.findOne({ email }).select('+password')
  if (!user) return false
  const validate = await user.comparePassword(password)
  if (!validate) return
  return pick(user.toObject(), ['email', 'name', '_id'])
}
