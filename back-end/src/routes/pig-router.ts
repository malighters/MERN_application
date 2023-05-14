import { Request, Response, Router } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import Pig from "../models/pig-model";
type queryObjectType = {
  tag?: { $regex: string, $options: string },
  gender?: string
  breed?: string,
  sort?: string
}

const pigRouter = Router();

pigRouter.get('/', async (req: Request, res: Response) => {
  const { search, gender, breed, sort } = req.query;

  let queryObject: queryObjectType = {}

  if (search && typeof search === 'string') {
    queryObject.tag = { $regex: search, $options: 'i' };
   }

  if (gender && gender !== 'all' && typeof gender === 'string') {
    queryObject.gender = gender;
  }

  if (breed && breed !== 'all' && typeof breed === 'string') {
    queryObject.breed = breed;
  }

  let result = Pig.find(queryObject);
  
  if (sort === 'latest') {
    result = result.sort('-birth_date')
  }
  if (sort === 'oldest') {
    result = result.sort('birth_date')
  }
  if (sort === 'a-z') {
    result = result.sort('tag')
  }
  if (sort === 'z-a') {
    result = result.sort('-tag')
  }

  const page = req.query.page !== undefined && typeof req.query.page === 'string' ?  parseInt(req.query.page, 10) : 1;
  const limit = Number(req.query.limit) | 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const pigs = await result;

  const totalPigs = await Pig.countDocuments(queryObject);

  const numOfPages = Math.ceil(totalPigs / limit);

  res.status(200).json({pigs, totalPigs, numOfPages});
})

pigRouter.get('/stats', async (req: Request, res: Response) => {
  const data = await Pig.aggregate([
    { $group: { _id: "$breed", count: { $sum:1, } } }
  ]);

  const stats = data.reduce((acc:any, { _id, count}) => {
    acc[_id] = count;
    return acc;
  }, {});

  const defaultStats = {
    Berkshire: stats.Berkshire || 0,
    "Chester White": stats["Chester White"] || 0, 
    Duroc: stats.Duroc || 0, 
    Hampshire: stats.Hampshire || 0, 
    Landrace: stats.Landrace || 0, 
    "Poland China": stats["Poland China"] || 0, 
    Spotted: stats.Spotted || 0, 
    Yorkshire: stats.Yorkshire || 0
  };

  let modifiedStats: {Breed: string, Quantity: number}[] = []

  for (const item in defaultStats) {
    modifiedStats.push({Breed: item, Quantity: defaultStats[item as keyof typeof defaultStats]})
  }

  res.status(200).json({ modifiedStats });
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