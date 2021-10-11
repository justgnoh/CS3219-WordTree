/* DROP TABLE IF EXISTS UserProfile, Interest, UserInterest; */

DROP VIEW IF EXISTS UserProfile, Interest, UserInterest;

/* stub */
CREATE TABLE UserAccount (
    id INT PRIMARY KEY
);

/* stub */
CREATE TABLE EssayPara (
    challenge_id INT,
    seq_num INT,
    PRIMARY KEY (challenge_id, seq_num)
);

CREATE TABLE UserProfile (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(50),
    total_nut INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES UserAccount(id),
    CONSTRAINT total_nut_more_than_zero CHECK (total_nut >= 0)
);

CREATE TABLE Interest (
    interest VARCHAR(20) PRIMARY KEY
);

CREATE TABLE UserInterest (
    user_id INT,
    interest VARCHAR(20),
    PRIMARY KEY (user_id, interest),
    FOREIGN KEY (user_id) REFERENCES UserAccount(id),
    FOREIGN KEY (interest) REFERENCES Interest
);

CREATE TABLE EssayNut (
    user_id INT,
    nut INT NOT NULL,
    challenge_id INT,
    seq_num INT,
    PRIMARY KEY (user_id, challenge_id, seq_num),
    FOREIGN KEY (challenge_id, seq_num) REFERENCES EssayPara,
    FOREIGN KEY (user_id) REFERENCES UserAccount(id)
);
