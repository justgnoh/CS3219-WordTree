import { Pool } from 'pg';
import { db } from '../config';

export default new Pool({
    connectionString: 'postgresql://nikhila@localhost:5432/word_squirrel',
});