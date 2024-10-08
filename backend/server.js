import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';
import testRoute from './routes/test.route.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';

import { connectDB } from './db/connectDB.js';

const app = express();
dotenv.config();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use(express.json()); //this will allow to upload json value
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/test', testRoute);
app.use('/api/posts', postRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}`);
});
