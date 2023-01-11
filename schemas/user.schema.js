import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 5,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  telephone: {
    type: String,
    unique: true,
    required: true,
  },
  albums: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "albums",
    },
  ],
  stickers: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "stickers",
    },
  ],
});

const User = mongoose.model("users", UserSchema);

export { User, UserSchema };
