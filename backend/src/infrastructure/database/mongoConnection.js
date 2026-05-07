const mongoose = require('mongoose');

const globalWithMongoose = globalThis;
if (!globalWithMongoose.__mongooseCache) {
    globalWithMongoose.__mongooseCache = { conn: null, promise: null };
}
const cache = globalWithMongoose.__mongooseCache;

/**
 * Reuses the same connection across Vercel serverless invocations (warm instances).
 * Safe to call from every request; resolves immediately when already connected.
 */
async function connectDB() {
    if (mongoose.connection.readyState === 1) return mongoose.connection;

    if (!process.env.MONGO_URI) {
        throw new Error('Missing MONGO_URI environment variable');
    }

    if (cache.promise) {
        await cache.promise;
        return mongoose.connection;
    }

    mongoose.set('bufferCommands', false);

    const opts = {
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 10000
    };

    cache.promise = mongoose.connect(process.env.MONGO_URI, opts).then(() => mongoose.connection);
    cache.conn = await cache.promise;
    return cache.conn;
}

module.exports = connectDB;
