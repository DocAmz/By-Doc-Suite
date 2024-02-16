import mongoose from 'mongoose'

export const connectMongoDB = async (): Promise<typeof mongoose | void> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MongoDB URI is not defined');
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
    return mongoose;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};