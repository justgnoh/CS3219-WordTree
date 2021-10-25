export const port = process.env.PORT;

 export const authenticated_endpoints = [
     "/challenge/"
 ]


const dotenv = require('dotenv');
dotenv.config();

export const POSTGRES_URL = process.env.POSTGRES_URL;

export const OK_MESSAGE = "OK";