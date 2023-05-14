import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import errorHandlerMiddleware from './middleware/error-handler-middleware';
import notFoundMiddleware from './middleware/not-found-middleware';
import authRouter from './routes/auth-router';
import pigRouter from './routes/pig-router';
import { MONGO_URI, PORT, NODE_ENV } from './utils/config';
import authMiddleware from './middleware/auth-middleware';

import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit'

import path from 'path';

const app = express();
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
  message: "Too many requests from your computer, please try again in 15 minutes",
})

app.use(limiter)

if(NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(cors());

app.use('/auth', authRouter);
app.use('/pigs', authMiddleware, pigRouter);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose.connect(MONGO_URI).then(() => {
  console.log('Database was successfully conncted');
  app.listen(PORT, () => {
    console.log(`Server has been started on http://localhost:${PORT}`);
  });
})