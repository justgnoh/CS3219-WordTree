import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export const port = process.env.PORT;
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

let rawdata = fs.readFileSync(GOOGLE_APPLICATION_CREDENTIALS);
export const serviceAccount = JSON.parse(rawdata);