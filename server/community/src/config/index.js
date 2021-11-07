import dotenv from 'dotenv';

export const port = process.env.PORT;

dotenv.config();

export const POSTGRES_URL = process.env.POSTGRES_URL;
