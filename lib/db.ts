import mongoose from "mongoose";

const URL: string | undefined = process.env.DATABASE_URL;

export default async function ConnectDB() {
  try {
    if (!URL) {
      throw new Error("DATABASE_URL is not defined");
    }
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error while connecting to database:", e);
  }
}
