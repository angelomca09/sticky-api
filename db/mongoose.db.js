import mongoose from "mongoose";

async function connect() {
  const uri = "mongodb://localhost:27017/sticky";
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export { connect };
