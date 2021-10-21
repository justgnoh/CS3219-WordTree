import { Pool } from 'pg';
import { POSTGRES_URL } from '../config';

export default new Pool({
    connectionString: POSTGRES_URL,
});