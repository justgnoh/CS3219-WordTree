DROP TABLE IF EXISTS UserAccount, UserProfile, Interest, UserInterest, Challenges, TurnDetails, WordsPerChallenge, EssayPara, EssayNut, CommunityChallengeNut, CommunityEssayNut CASCADE;

CREATE TABLE UserAccount (
    user_id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE UserProfile (
    user_id VARCHAR(50) PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    total_nut INTEGER NOT NULL DEFAULT 0,
    date_of_birth DATE NOT NULL,
    joined_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES UserAccount(user_id),
    CONSTRAINT valid_total_nut CHECK (total_nut >= 0)
);

CREATE TABLE Interest (
    interest VARCHAR(20) PRIMARY KEY
);

CREATE TABLE UserInterest (
    user_id VARCHAR(50),
    interest VARCHAR(20),
    PRIMARY KEY (user_id, interest),
    FOREIGN KEY (user_id) REFERENCES UserAccount(user_id),
    FOREIGN KEY (interest) REFERENCES Interest(interest)
);

CREATE TABLE Challenges (
    challenge_id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    squirrel_id VARCHAR(50) NOT NULL REFERENCES UserAccount(user_id),
    racoon_id VARCHAR(50) REFERENCES UserAccount(user_id) DEFAULT NULL,
    num_of_total_turns INTEGER NOT NULL CHECK (num_of_total_turns = 4 OR num_of_total_turns = 6),
    word_limit_per_turn INTEGER NOT NULL CHECK (word_limit_per_turn = 300 OR word_limit_per_turn = 500),
    interest VARCHAR(100) NOT NULL REFERENCES Interest(interest),
    status_of_challenge VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    CHECK (squirrel_id != racoon_id),
    CHECK (status_of_challenge = 'DRAFT' OR status_of_challenge = 'WAITING_MATCH' OR status_of_challenge = 'COMPLETED'),
    CHECK (((status_of_challenge = 'DRAFT' OR status_of_challenge = 'WAITING_MATCH') AND racoon_id IS NULL) OR racoon_id IS NOT NULL),
    CHECK (status_of_challenge != 'COMPLETED' OR title IS NOT NULL)
);

CREATE TABLE TurnDetails (
    challenge_id SERIAL PRIMARY KEY,
    num_of_sequences_completed INTEGER NOT NULL DEFAULT 0,
    time_of_last_completed_sequence TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE WordsPerChallenge (
    challenge_id INTEGER REFERENCES Challenges(challenge_id),
    seq_num INTEGER,
    word_list TEXT[] NOT NULL CHECK (cardinality(word_list) = 3),
    PRIMARY KEY (challenge_id, seq_num)
);

CREATE TABLE EssayPara (
    challenge_id INTEGER REFERENCES Challenges(challenge_id),
    seq_num INTEGER NOT NULL,
    author_id VARCHAR(50) NOT NULL REFERENCES UserAccount(user_id),
    essay_para TEXT NOT NULL,
    words_used TEXT[],
    PRIMARY KEY (challenge_id, seq_num)
);

CREATE TABLE EssayNut (
    user_id VARCHAR(50),
    challenge_id INTEGER,
    seq_num INTEGER,
    nut INTEGER NOT NULL,
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, challenge_id, seq_num),
    FOREIGN KEY (challenge_id, seq_num) REFERENCES EssayPara(challenge_id, seq_num),
    FOREIGN KEY (user_id) REFERENCES UserAccount(user_id)
);

CREATE TABLE CommunityChallengeNut (
    upvoter_user_id VARCHAR(50),
    upvoted_user_id VARCHAR(50),
    challenge_id INTEGER,
    nut INTEGER NOT NULL DEFAULT 1,
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (upvoter_user_id, upvoted_user_id, challenge_id),
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id),
    FOREIGN KEY (upvoted_user_id) REFERENCES UserAccount(user_id),
    FOREIGN KEY (upvoter_user_id) REFERENCES UserAccount(user_id)
);

CREATE TABLE CommunityEssayNut (
    upvoter_user_id VARCHAR(50),
    upvoted_user_id VARCHAR(50),
    challenge_id INTEGER,
    seq_num INTEGER,
    nut INTEGER NOT NULL DEFAULT 1,
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (upvoter_user_id, upvoted_user_id, challenge_id, seq_num),
    FOREIGN KEY (challenge_id, seq_num) REFERENCES EssayPara(challenge_id, seq_num),
    FOREIGN KEY (upvoter_user_id) REFERENCES UserAccount(user_id),
    FOREIGN KEY (upvoted_user_id) REFERENCES UserAccount(user_id)
);
