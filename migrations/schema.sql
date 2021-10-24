DROP TABLE IF EXISTS UserAccount, UserProfile, Interest, UserInterest, Challenges, TurnDetails, WordsPerChallenge, EssayPara, EssayNut cascade;

CREATE TABLE UserAccount (
    user_id INTEGER PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    access_token TEXT
);

CREATE TABLE UserProfile (
    user_id INT PRIMARY KEY,
    username VARCHAR(50),
    total_nut INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES UserAccount(user_id),
    CONSTRAINT total_nut_more_than_zero CHECK (total_nut >= 0)
);

CREATE TABLE Interest (
    interest VARCHAR(20) PRIMARY KEY
);

CREATE TABLE UserInterest (
    user_id INT,
    interest VARCHAR(20),
    PRIMARY KEY (user_id, interest),
    FOREIGN KEY (user_id) REFERENCES UserAccount(user_id),
    FOREIGN KEY (interest) REFERENCES Interest
);

CREATE TABLE Challenges (
    challenge_id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    squirrel_id INTEGER NOT NULL References UserAccount(user_id),
    racoon_id INTEGER References UserAccount(user_id) DEFAULT NULL,
    num_of_total_turns INTEGER NOT NULL CHECK (num_of_total_turns = 4 OR num_of_total_turns = 6),
    word_limit_per_turn INTEGER NOT NULL CHECK (word_limit_per_turn = 300 OR word_limit_per_turn = 500),
    interest VARCHAR(100) NOT NULL References Interest(interest),
    status_of_challenge VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    CHECK (squirrel_id != racoon_id),
    CHECK (((status_of_challenge = 'DRAFT' OR status_of_challenge = 'WAITING_MATCH') AND racoon_id = NULL) OR racoon_id != NULL),
    CHECK (status_of_challenge != 'COMPLETED' OR title IS NOT NULL)
);


CREATE TABLE TurnDetails(
    challenge_id SERIAL PRIMARY KEY,
    num_of_sequences_completed INTEGER DEFAULT 0,
    time_of_last_completed_sequence TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table WordsPerChallenge (
    challenge_id integer references Challenges(challenge_id),
    seq_num integer,
    word_list text[] not null CHECK (cardinality(word_list) = 3),
    primary key(challenge_id, seq_num)
);

create table EssayPara (
    challenge_id integer references Challenges(challenge_id),
    seq_num integer not null,
    author_id integer references UserAccount(user_id),
    essay_para text not null,
    words_used text[],
    primary key (challenge_id, seq_num)
);

CREATE TABLE EssayNut (
    user_id INT,
    nut INT NOT NULL,
    challenge_id INT,
    seq_num INT,
    PRIMARY KEY (user_id, challenge_id, seq_num),
    FOREIGN KEY (challenge_id, seq_num) REFERENCES EssayPara(challenge_id, seq_num),
    FOREIGN KEY (user_id) REFERENCES UserAccount(user_id)
);
