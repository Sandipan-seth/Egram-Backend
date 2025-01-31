import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB....");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error in connection to MongoDB", err);
    });
    const connection = await mongoose.connect(`${process.env.MONGO_URL}/egram`);
  } catch (err) {
    console.log(err);
  }
};

export default ConnectDb;
