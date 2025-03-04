import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB connected ${con.connection.host}`);
  } catch (error) {
    console.log(`Error ${error.message}`);
    process.exit(1); // 1 = error
  }
};
