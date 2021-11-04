import pg from 'pg';
import { POSTGRES_URL } from '../config/index.js';
const Pool = pg.Pool;
const pool = new Pool({
  connectionString: POSTGRES_URL
});

export async function insertNewEssayPara(challengeid, seqnum, authorid, essaypara, wordsused) {
  try {
    if (wordsused.length > 0) {
      await pool.query("INSERT INTO EssayPara(challenge_id, seq_num, author_id, essay_para, words_used) VALUES ($1, $2, $3, $4, $5);", [challengeid, seqnum, authorid, essaypara, wordsused]);
    } else {
      await pool.query("INSERT INTO EssayPara(challenge_id, seq_num, author_id, essay_para) VALUES ($1, $2, $3, $4);", [challengeid, seqnum, authorid, essaypara]);
    }
  } catch (err) {
    throw err;
  }
}

export async function getAllEssayPara(challengeid) {
  try {
    const result = await pool.query("SELECT seq_num, author_id, essay_para, words_used FROM EssayPara where challenge_id = $1 order by seq_num;", [challengeid]);
    return result;
  } catch (err) {
    throw err;
  }
}
