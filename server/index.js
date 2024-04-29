import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRouter from './router/post.js';
import userRouter from './router/user.js';
import cookieParser from 'cookie-parser';
import credentials from './config/credentials.js';
import corsOptions from './config/corsOptions.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

// router
app.use('/posts', postRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)),
  )
  .catch((error) => console.log(error.message));
