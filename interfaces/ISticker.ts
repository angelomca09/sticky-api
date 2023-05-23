import { Types } from "mongoose";

export interface ISticker {
  id?: Types.ObjectId
  name: string,
  number: number,
  image: string,
}