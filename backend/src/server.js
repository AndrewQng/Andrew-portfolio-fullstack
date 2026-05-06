const express = require('express');
const cors = require('cors');
const dns = require('dns');
const connectDB = require('./infrastructure/database/mongoConnection');
require('dotenv').config();

dns.setServers(['1.1.1.1']);

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});