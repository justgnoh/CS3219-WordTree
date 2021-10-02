//import pool from '../database/db';
import pg from 'pg';
const Pool = pg.Pool;
const pool = new Pool({
  user: 'yunqing',
  host: 'localhost',
  database: 'testdb',
  password: '',
  port: 5432
});

class WordDao {
    async getWordsForTurn(challengeid, seqnum) {
        //psql array is 1-indexing
        //function returns a single array of 3 words
        try {
          const wordarr = await pool.query("select ARRAY(select unnest(word_list[$1:$1])) from wordsperchallenge WHERE challenge_id = $2;", [seqnum, challengeid]);
          return wordarr.rows[0]["array"];
        } catch (err) {
          throw err;
        }
    }

    async 

}

export default new WordDao();
