import mongoose from "mongoose";

const MongoDBConnection = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const res = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Successfully connected!!");
  } catch (error) {
    console.log("Error in Database Connection :", error);
    throw error;
  }
};

export default MongoDBConnection;
