const express = require('express');
const cors = require('cors');
const connectDB = require('./src/infrastructure/database/mongoConnection');
const projectRoutes = require('./src/presentation/routes/projectRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT);