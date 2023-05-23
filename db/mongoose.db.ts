import mongoose from "mongoose";

async function connect() {
  const uri = process.env.MONGO_URL!;
  return await mongoose.connect(uri)
    .catch((err: Error) => {
      console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
      process.exit();
    });
}

export { connect };
