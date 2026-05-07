const connectDB = require('../../infrastructure/database/mongoConnection');

async function ensureMongoConnection(req, res, next) {
    try {
        await connectDB();
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = ensureMongoConnection;
