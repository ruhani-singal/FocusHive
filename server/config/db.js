import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✔ MongoDB Connected Successfully");
    console.log(`📌 Database Name: ${conn.connection.name}`);
    console.log(`🖥 Host: ${conn.connection.host}`);
    console.log("-------------------------------------");
    
  } catch (error) {
    console.error("❌ MongoDB Connection Error");
    console.error(error.message);
    process.exit(1);
  }
};


export default connectDB;