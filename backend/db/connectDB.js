import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log('Error connection to MongoDb: ', error.message);
    process.exit(1);
  }
};
