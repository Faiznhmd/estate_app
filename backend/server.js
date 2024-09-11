import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';

const app = express();
dotenv.config();
const PORT = 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}`);
});
