//- ./index.ts
import './models/LifeInsurance';
import './models/Takaful';
import './models/User';
import './models/Specialist';

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from "cors"
import router from "./config/router"

dotenv.config()
console.log("MongoDB URI:", process.env.MONGODB_URI)

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", router) //e.g: /api/signup


async function start() {
  const mongoUri = process.env.MONGODB_URI;

  // Check if the MongoDB URI is defined
  if (!mongoUri) {
    console.error('MongoDB URI is not defined. Please check your .env file.');
    process.exit(1); // Exit if the URI is not defined
  }

  try {
    await mongoose.connect(mongoUri); // Removed deprecated options
    console.log('Connected to the database! 🔥');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }

  const port = process.env.PORT || 8000;
  const host = process.env.HOST || 'localhost';

  app.listen(port, () => {
    console.log(`Express API is running on http://${host}:${port}`);
  });
}

start()