import dotenv from 'dotenv';

export const port = process.env.PORT;
// const dotenv1 = require('dotenv');
dotenv.config()

export const POSTGRES_URL = process.env.POSTGRES_URL;

