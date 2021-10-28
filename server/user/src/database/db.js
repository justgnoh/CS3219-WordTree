import pkg from 'pg';
const { Pool } = pkg;
import { POSTGRES_URL } from '../config/index.js';

export default new Pool({
    connectionString: POSTGRES_URL,
//    user: 'postgres',
//    host: 'localhost',
//    database: 'word_tree',
//    password: 'password',
//    port: 5432,
});