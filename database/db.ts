import mongoose from "mongoose";

const connect = async () => {
  try {
    const dbConnection = "mongodb+srv://cristianlunachavarro:vcYGta4XaBCgLGOn@cluster0.4pealig.mongodb.net/";
    if (!dbConnection) {
      throw new Error("DB connection string is not defined");
    }
    await mongoose.connect(dbConnection);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const disconnect = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    } else {
      console.log("Already disconnected from MongoDB");
    }
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error;
  }
};

export { connect, disconnect };
