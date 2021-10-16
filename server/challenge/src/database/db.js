import { Pool } from 'pg';

export default new Pool({
    connectionString: "postgresql://nikhila@localhost:5432/word_squirrel",
});