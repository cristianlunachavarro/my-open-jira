const mongoose = require("mongoose");

const mongooConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongooConnection.isConnected) {
    console.log("We are already connected");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readystate;
    if (mongooConnection.isConnected === 1) {
      console.log("Using last connection");
      return;
    }
    await mongoose.connection.close();
  }
  await mongoose.connect(process.env.DB_CONNECTION);
  mongooConnection.isConnected = 1;
  console.log("Conected to MongoDb");
};

export const disconnect = async () => {
  if (mongooConnection.isConnected === 0) return;
  await mongoose.connection.close();
  console.log("Disconnected from MongoDb");
};
