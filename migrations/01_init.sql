drop table if exists WordsPerChallenge, EssayPara cascade;

create table Challenges ( /*stub*/
    challenge_id serial primary key
);

create table WordsPerChallenge (
    challenge_id integer references Challenges(challenge_id),
    seq_num integer,
    word_list text[] not null,
    primary key(challenge_id, seq_num)
);

create table EssayPara (
    challenge_id integer references Challenges(challenge_id),
    seq_num integer not null,
    author_id integer references Users(id),
    essay_para text not null,
    words_used text[],
    primary key (challenge_id, seq_num)
);
