DROP TABLE IF EXISTS UserAccount, UserProfile, Interest, UserInterest, Challenges, TurnDetails, WordsPerChallenge, EssayPara, EssayNut, CommunityChallengeNut, CommunityEssayNut CASCADE;

CREATE TABLE UserAccount (
    user_id INTEGER PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE UserProfile (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(50),
    total_nut INT DEFAULT 0,
    date_of_birth DATE,
    joined_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
    squirrel_id INTEGER NOT NULL REFERENCES UserAccount(user_id),
    racoon_id INTEGER REFERENCES UserAccount(user_id) DEFAULT NULL,
    num_of_total_turns INTEGER NOT NULL CHECK (num_of_total_turns = 4 OR num_of_total_turns = 6),
    word_limit_per_turn INTEGER NOT NULL CHECK (word_limit_per_turn = 300 OR word_limit_per_turn = 500),
    interest VARCHAR(100) NOT NULL REFERENCES Interest(interest),
    status_of_challenge VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    CHECK (squirrel_id != racoon_id),
    CHECK (((status_of_challenge = 'DRAFT' OR status_of_challenge = 'WAITING_MATCH') AND racoon_id = NULL) OR racoon_id != NULL),
    CHECK (status_of_challenge != 'COMPLETED' OR title IS NOT NULL)
);

CREATE TABLE TurnDetails (
    challenge_id SERIAL PRIMARY KEY,
    num_of_sequences_completed INTEGER DEFAULT 0,
    time_of_last_completed_sequence TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE WordsPerChallenge (
    challenge_id integer REFERENCES Challenges(challenge_id),
    seq_num integer,
    word_list text[] NOT NULL CHECK (cardinality(word_list) = 3),
    PRIMARY KEY (challenge_id, seq_num)
);

CREATE TABLE EssayPara (
    challenge_id integer REFERENCES Challenges(challenge_id),
    seq_num integer NOT NULL,
    author_id integer REFERENCES UserAccount(user_id),
    essay_para text NOT NULL,
    words_used text[],
    PRIMARY KEY (challenge_id, seq_num)
);

CREATE TABLE EssayNut (
    user_id INT,
    challenge_id INT,
    seq_num INT,
    nut INT NOT NULL,
    datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, challenge_id, seq_num),
    FOREIGN KEY (challenge_id, seq_num) REFERENCES EssayPara(challenge_id, seq_num),
    FOREIGN KEY (user_id) REFERENCES UserAccount(user_id)
);

CREATE TABLE CommunityChallengeNut (
    upvoter_user_id INT,
    upvoted_user_id INT,
    challenge_id INT,
    nut INT NOT NULL DEFAULT 1,
    datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (upvoter_user_id, upvoted_user_id, challenge_id),
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id),
    FOREIGN KEY (upvoted_user_id) REFERENCES UserAccount(user_id),
    FOREIGN KEY (upvoter_user_id) REFERENCES UserAccount(user_id)
);

CREATE TABLE CommunityEssayNut (
    upvoter_user_id INT,
    upvoted_user_id INT,
    challenge_id INT,
    seq_num INT,
    nut INT NOT NULL DEFAULT 1,
    datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (upvoter_user_id, upvoted_user_id, challenge_id, seq_num),
    FOREIGN KEY (challenge_id, seq_num) REFERENCES EssayPara(challenge_id, seq_num),
    FOREIGN KEY (upvoter_user_id) REFERENCES UserAccount(user_id),
    FOREIGN KEY (upvoted_user_id) REFERENCES UserAccount(user_id)
);
