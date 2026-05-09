const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
    totalViews: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    ips: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Stats', StatsSchema);
