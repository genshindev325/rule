import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (typeof MONGODB_URI !== 'string') {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

// Ensure that `global` is properly declared
declare global {
  var mongoose: MongooseCache | undefined;
}

// Initialize `cached` to avoid TypeScript error
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Since we have validated MONGODB_URI, TypeScript will treat it as string
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    }).catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Assign `cached` to `global.mongoose` after initialization
global.mongoose = cached;

export default dbConnect;
