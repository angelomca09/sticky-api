import { Types } from "mongoose"

export interface IUser {
  id?: Types.ObjectId
  username: string
  email: string
  telephone: string
  password: string
  albums?: Types.ObjectId[]
  stickers?: Types.ObjectId[]
}

export interface IProfileUser {
  id?: string
  username: string
  email?: string
  telephone?: string
}