import mongoose from "mongoose";

async function connect() {
  const uri = "mongodb://127.0.0.1:27017/sticky";
  return await mongoose.connect(uri)
    .catch((err: Error) => {
      console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
      process.exit();
    });
}

export { connect };
