import pkg from 'pg';
const { Pool } = pkg;
import { POSTGRES_URL } from '../config/index.js';

export default new Pool({
    connectionString: POSTGRES_URL
});
