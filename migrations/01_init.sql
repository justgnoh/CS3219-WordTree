drop table if exists WordsPerChallenge, EssayPara cascade;

create table Challenges ( /*stub*/
    challenge_id serial primary key
);

create table WordsPerChallenge (
    challenge_id integer primary key references Challenges(challenge_id),
    word_list text[][] not null
);
