import mongoose from "mongoose";

const connectToDB = async () => {
  const MongoURI = process.env.MongoURI;

  try {
    await mongoose.connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
    
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export default connectToDB;
