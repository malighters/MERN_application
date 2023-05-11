import { Request, Response, Router } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import Pig from "../models/pig-model";

const pigRouter = Router();

pigRouter.get('/', async (req: Request, res: Response) => {
  res.status(200).send('dsad');
})

pigRouter.get('/:id', async (req: Request, res: Response) => {
  
})

pigRouter.post('/', async (req: Request, res: Response) => {
  const { tag, gender, breed, birth_date, note } = req.body;
  
  if (!tag) {
    throw new BadRequestError('Please provide tag');
  }

  const pig = await Pig.create({ tag, gender, breed, birth_date, note });

  res.status(201).json({pig});
})

pigRouter.patch('/:id', async (req: Request, res: Response) => {
  
})

pigRouter.delete('/:id', async (req: Request, res: Response) => {
  
})

export default pigRouter;