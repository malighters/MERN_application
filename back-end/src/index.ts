import express, { Request, Response } from 'express';
import { MONGO_URI } from './utils/config';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({"msg": "return"});
})

app.listen(3000, () => {
  console.log('Server has been started on http://localhost:3000');
});