import { Types } from "mongoose";

export interface IAlbum {
  id?: Types.ObjectId
  name: string;
  pages: number;
  image: string;
  stickers?: Types.ObjectId[]
}