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


const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({"msg": "return"});
})

if(NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(cors());

app.use('/auth', authRouter);
app.use('/pigs', pigRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose.connect(MONGO_URI).then(() => {
  console.log('Database was successfully conncted');
  app.listen(PORT, () => {
    console.log(`Server has been started on http://localhost:${PORT}`);
  });
})