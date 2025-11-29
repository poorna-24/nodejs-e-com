import mongoose from "mongoose";
const dbConnect = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb connected ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    // process.exit(1);

    //0 means end the process without any kind of failure.
    //1 means end the process with some failure.
  }
};
export default dbConnect;
