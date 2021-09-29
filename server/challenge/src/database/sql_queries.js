const SQL_QUERIES = {
    getChallengeByUserID: "SELECT * FROM Challenges WHERE squirrel_iD = $1 OR racoon_id = $1",
}

module.exports = {
    SQL_QUERIES
}