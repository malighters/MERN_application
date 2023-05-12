import { Request, Response, Router } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import Pig from "../models/pig-model";

const pigRouter = Router();

pigRouter.get('/', async (req: Request, res: Response) => {
  const pigs = await Pig.find();

  res.status(200).json({pigs, totalPigs: pigs.length, numOfPages: 1});
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
  const id = req.params?.id;

  const { tag, gender, breed, birth_date, note } = req.body;
  
  if (!tag) {
    throw new BadRequestError('Please provide tag');
  }

  const pig = await Pig.findOne({ _id: id });

  if (!pig) {
    throw new NotFoundError(`No pig with such id ${id}`)
  }

  const updatedPig = await Pig.findByIdAndUpdate(id, { tag, gender, breed, birth_date, note }, { new: true, runValidators: true });

  res.status(200).json({ updatedPig });
  
})

pigRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params?.id;

  const pig = await Pig.findOne({ _id: id });

  if (!pig) {
    throw new NotFoundError(`No pig with such id ${id}`)
  }

  const deletedPig = await Pig.findByIdAndDelete(id);

  res.status(200).json({ deletedPig });
})

export default pigRouter;