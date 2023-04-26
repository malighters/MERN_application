import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'try again';
const JWT_LIFETIME= process.env.JWT_LIFETIME || '1d';
const JWT_SECRET= process.env.JWT_SECRET || 'pigfarm';

export { MONGO_URI, JWT_LIFETIME, JWT_SECRET };