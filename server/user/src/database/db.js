import pkg from 'pg';
const { Pool } = pkg;
import { db } from '../config/index.js';

export default new Pool({
    connectionString: db,
    user: 'postgres',
    host: 'localhost',
    database: 'word_tree',
    password: 'password',
    port: 5432,
});