const SQL_QUERIES = {
    getChallengeByUserID: "SELECT * FROM Challenges WHERE squirrel_iD = $1 OR racoon_id = $1",
    insertChallenge: "insert into Challenges (squirrel_id, num_of_total_turns, word_limit_per_turn, genre) values ($1, $2, $3, $4);"
}

module.exports = {
    SQL_QUERIES
}