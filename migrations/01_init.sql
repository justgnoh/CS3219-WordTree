DROP TABLE TurnDetails;
DROP TABLE Challenges;
DROP TABLE Interests;
DROP TABLE Users;

CREATE TABLE Users(
    id SERIAL PRIMARY KEY
);

CREATE TABLE Interests(
    interest VARCHAR(100) PRIMARY KEY
);

CREATE TABLE Challenges(
    challenge_id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    squirrel_id INTEGER NOT NULL References Users(id),
    racoon_id INTEGER References Users(id) DEFAULT NULL,
    num_of_total_turns INTEGER NOT NULL CHECK (num_of_total_turns = 4 OR num_of_total_turns = 6),
    word_limit_per_turn INTEGER NOT NULL CHECK (word_limit_per_turn = 300 OR word_limit_per_turn = 500),
    genre VARCHAR(100) NOT NULL References Interests(interest),
    status_of_challenge VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    CHECK (squirrel_id != racoon_id),
    CHECK (((status_of_challenge = 'DRAFT' OR status_of_challenge = 'WAITING_MATCH') AND racoon_id = NULL) OR racoon_id != NULL),
    CHECK (status_of_challenge != 'COMPLETED' OR title IS NOT NULL)
);


CREATE TABLE TurnDetails(
    challenge_id INTEGER References Challenges(challenge_id) NOT NULL,
    num_of_sequences_completed INTEGER DEFAULT 0,
    time_of_last_completed_sequence TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(challenge_id)
);

/* stub */
CREATE TABLE UserAccount (
    id INT PRIMARY KEY
);

/* stub */
CREATE TABLE EssayPara (
    challenge_id int,
    seq_num int,
    PRIMARY KEY (challenge_id, seq_num)
);

CREATE TABLE UserProfile (
    user_id INT PRIMARY KEY,
    name VARCHAR(50),
    total_nut INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES UserAccount(user_id),
    CONSTRAINT total_nut_more_than_zero CHECK (total_nut >= 0)
);

CREATE TABLE EssayNut (
    user_id INT,
    nut INT NOT NULL,
    challenge_id INT,
    seq_num INT,
    PRIMARY KEY (user_id, challenge_id, seq_num),
    FOREIGN KEY (challenge_id, seq_num) REFERENCES EssayPara(challenge_id, seq_num),
    FOREIGN KEY (user_id) REFERENCES UserAccount(id)
);