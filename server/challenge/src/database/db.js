import pg from 'pg';
import { POSTGRES_URL } from '../config/index.js';
const { Pool } = pg;

export default new Pool({
    connectionString: POSTGRES_URL,
});