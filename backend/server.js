import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';

import { connectDB } from './db/connectDB.js';

const app = express();
dotenv.config();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}`);
});
