import pg from 'pg';
import { POSTGRES_URL } from '../config/index.js';
const Pool = pg.Pool;
const pool = new Pool({
  connectionString: POSTGRES_URL
});

//function returns a single array of 3 words
export async function getWordsForTurn(challengeid, seqnum) {
  //Note: psql array is 1-indexing
  try {
    const wordarr = await pool.query("SELECT word_list FROM WordsPerChallenge WHERE challenge_id = $1 and seq_num = $2;", [challengeid, seqnum]);
    return wordarr.rows[0]["word_list"];
  } catch (err) {
    throw err;
  }
}

export async function insertWordList(challengeid, seqnum, wordarr) {
  try {
    await pool.query("INSERT INTO WordsPerChallenge(challenge_id, seq_num, word_list) VALUES($1, $2, $3);", [challengeid, seqnum, wordarr]);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
