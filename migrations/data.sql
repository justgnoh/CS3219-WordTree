/*
* populate dummy data
*/
insert into UserAccount(user_id, username, password, access_token) values (1, 'user1', 'pw1', 'token1');
insert into UserAccount(user_id, username, password, access_token) values (2, 'user2', 'pw2', 'token2');
insert into UserAccount(user_id, username, password, access_token) values (3, 'user3', 'pw3', 'token3');
insert into UserAccount(user_id, username, password, access_token) values (4, 'user4', 'pw4', 'token4');

insert into UserProfile(user_id, user_name, total_nut) values (1, 'user1', 100);
insert into UserProfile(user_id, user_name, total_nut) values (2, 'user2', 200);
insert into UserProfile(user_id, user_name, total_nut) values (3, 'user3', 300);
insert into UserProfile(user_id, user_name, total_nut) values (4, 'user4', 400);

insert into Interest (interest) values ('crime');
insert into Interest (interest) values ('fantasy');
insert into Interest (interest) values ('horror');
insert into Interest (interest) values ('adventure');

insert into UserInterest(user_id, interest) values (1, 'crime');
insert into UserInterest(user_id, interest) values (2, 'fantasy');
insert into UserInterest(user_id, interest) values (3, 'adventure');
insert into UserInterest(user_id, interest) values (4, 'crime');

insert into Challenges(challenge_id, title, squirrel_id, racoon_id, num_of_total_turns, word_limit_per_turn, interest, status_of_challenge) values (1, 'Zoozzy', 1, 2, 4, 300, 'crime', 'DRAFT');
insert into Challenges(challenge_id, title, squirrel_id, racoon_id, num_of_total_turns, word_limit_per_turn, interest, status_of_challenge) values (2, 'Oyonder', 3, 4, 4, 300, 'adventure', 'DRAFT');
insert into Challenges(challenge_id, title, squirrel_id, racoon_id, num_of_total_turns, word_limit_per_turn, interest, status_of_challenge) values (3, 'Oyondu', 1, 4, 4, 500, 'crime', 'DRAFT');
insert into Challenges(challenge_id, title, squirrel_id, racoon_id, num_of_total_turns, word_limit_per_turn, interest, status_of_challenge) values (4, 'Zoozzy', 3, 2, 4, 500, 'fantasy', 'DRAFT');


insert into TurnDetails (challenge_id, num_of_sequences_completed) values (1, 1);
insert into TurnDetails (challenge_id, num_of_sequences_completed) values (2, 1);
insert into TurnDetails (challenge_id, num_of_sequences_completed) values (3, 1); 
insert into TurnDetails (challenge_id, num_of_sequences_completed) values (4, 1); 

insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (1, 1, ARRAY['death', 'murder', 'detective']);
insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (1, 2, ARRAY['criminality', 'sin', 'offence']);
insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (1, 3, ARRAY['trespass', 'wrongdoing', 'violation']);
insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (2, 1, ARRAY['daydream', 'delusion', 'hallucination']);
insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (2, 2, ARRAY['imagination', 'creativity', 'fiction']);
insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (2, 3, ARRAY['invention', 'fable', 'fabrication']);
insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (3, 1, ARRAY['chance', 'gamble', 'venture']);
insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (3, 2, ARRAY['experience', 'exploit', 'gest']);
insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (3, 3, ARRAY['enterprise', 'flier', 'flutter']);
insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (4, 1, ARRAY['criminality', 'sin', 'offence']);
insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (4, 2, ARRAY['death', 'murder', 'detective']);
insert into WordsPerChallenge(challenge_id, seq_num, word_list) values (4, 3, ARRAY['trespass', 'wrongdoing', 'violation']);

insert into EssayPara(challenge_id, seq_num, author_id, essay_para, words_used) values (1, 1, 1, 'The death of a detective due to the murder scared the shit out of me.', ARRAY['death', 'murder', 'detective']);
insert into EssayPara(challenge_id, seq_num, author_id, essay_para, words_used) values (2, 1, 3, 'I am not sure if I like to daydream.', ARRAY['daydream']);
insert into EssayPara(challenge_id, seq_num, author_id, essay_para) values (3, 1, 1, 'I am not sure how to start this essay.');
insert into EssayPara(challenge_id, seq_num, author_id, essay_para, words_used) values (4, 1, 3, 'It is an offence not to do your homework.', ARRAY['offence']);

insert into EssayNut(user_id, nut, challenge_id, seq_num) values (1, 3, 1, 1);
insert into EssayNut(user_id, nut, challenge_id, seq_num) values (3, 1, 2, 1);
insert into EssayNut(user_id, nut, challenge_id, seq_num) values (1, 0, 3, 1);
insert into EssayNut(user_id, nut, challenge_id, seq_num) values (3, 1, 4, 1);
