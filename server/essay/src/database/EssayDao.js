import pg from 'pg';
const Pool = pg.Pool;
const pool = new Pool({
  user: 'yunqing',
  host: 'localhost',
  database: 'testdb',
  password: '',
  port: 5432
});

export async function insertNewEssayPara(challengeid, seqnum, authorid, essaypara, wordsused) {
  try {
    await pool.query("INSERT INTO EssayPara(challenge_id, seq_num, author_id, essay_para, words_used) VALUES ($1, $2, $3, $4, $5);", [challengeid, seqnum, authorid, essaypara, wordsused]);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getAllEssayPara(challengeid) {
  try {
    const result = await pool.query("SELECT * FROM EssayPara where challenge_id = $1 order by seq_num;", [challengeid]);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
