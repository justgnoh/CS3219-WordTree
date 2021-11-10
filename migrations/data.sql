/* Populate sample data into database */
INSERT INTO UserAccount (user_id, email) VALUES ('oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'nikhila@gmail.com');
INSERT INTO UserAccount (user_id, email) VALUES ('JIcmq40600cn8YBLa0uBVv0fJZe2', 'yunqing@gmail.com');
INSERT INTO UserAccount (user_id, email) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'boonji@gmail.com');
INSERT INTO UserAccount (user_id, email) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'justin@gmail.com');
INSERT INTO UserAccount (user_id, email) VALUES ('aAnRr402HkUowub1KE8VuHfWzVp2', 'james@gmail.com');

INSERT INTO UserProfile (user_id, user_name, total_nut, date_of_birth) VALUES ('oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'Nikhila', 9, '01/01/1996');
INSERT INTO UserProfile (user_id, user_name, total_nut, date_of_birth) VALUES ('JIcmq40600cn8YBLa0uBVv0fJZe2', 'Yun Qing', 17, '01/01/1997');
INSERT INTO UserProfile (user_id, user_name, total_nut, date_of_birth) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'Boon Ji', 6, '01/01/1998');
INSERT INTO UserProfile (user_id, user_name, total_nut, date_of_birth) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'Justin', 13, '01/01/1999');
INSERT INTO UserProfile (user_id, user_name, date_of_birth) VALUES ('aAnRr402HkUowub1KE8VuHfWzVp2', 'James', '01/01/2000');


INSERT INTO Interest (interest) VALUES ('Crime');
INSERT INTO Interest (interest) VALUES ('Horror');
INSERT INTO Interest (interest) VALUES ('Fantasy');
INSERT INTO Interest (interest) VALUES ('Sci-Fi');
INSERT INTO Interest (interest) VALUES ('Adventure');

INSERT INTO UserInterest (user_id, interest) VALUES ('oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'Crime');
INSERT INTO UserInterest (user_id, interest) VALUES ('oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'Horror');
INSERT INTO UserInterest (user_id, interest) VALUES ('oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'Fantasy');
INSERT INTO UserInterest (user_id, interest) VALUES ('JIcmq40600cn8YBLa0uBVv0fJZe2', 'Fantasy');
INSERT INTO UserInterest (user_id, interest) VALUES ('JIcmq40600cn8YBLa0uBVv0fJZe2', 'Adventure');
INSERT INTO UserInterest (user_id, interest) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'Sci-Fi');
INSERT INTO UserInterest (user_id, interest) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'Crime');
INSERT INTO UserInterest (user_id, interest) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'Sci-Fi');
INSERT INTO UserInterest (user_id, interest) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'Horror');
INSERT INTO UserInterest (user_id, interest) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'Adventure');

INSERT INTO Challenges (challenge_id, title, squirrel_id, racoon_id, num_of_total_turns, word_limit_per_turn, interest, status_of_challenge)
VALUES (1, 'The Unsolved Mystery', 'oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'JIcmq40600cn8YBLa0uBVv0fJZe2', 4, 1000, 'Crime', 'COMPLETED');
INSERT INTO Challenges (challenge_id, squirrel_id, racoon_id, num_of_total_turns, word_limit_per_turn, interest, status_of_challenge)
VALUES (2, 'fDudvKGcZ7Sn5AAnHLWMggR34R82', 'UY8F8bckPGMYJYcjDVATXjuK9Qx2', 6, 1500, 'Horror', 'WAITING_MATCH');
INSERT INTO Challenges (challenge_id, squirrel_id, num_of_total_turns, word_limit_per_turn, interest, status_of_challenge)
VALUES (3, 'oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 4, 1500, 'Fantasy', 'DRAFT');
INSERT INTO Challenges (challenge_id, title, squirrel_id, racoon_id, num_of_total_turns, word_limit_per_turn, interest, status_of_challenge)
VALUES (4, 'Journey to the Dragon Island', 'JIcmq40600cn8YBLa0uBVv0fJZe2', 'UY8F8bckPGMYJYcjDVATXjuK9Qx2', 4, 1000, 'Adventure', 'COMPLETED');
INSERT INTO Challenges (challenge_id, squirrel_id, num_of_total_turns, word_limit_per_turn, interest, status_of_challenge)
VALUES (5, 'fDudvKGcZ7Sn5AAnHLWMggR34R82', 6, 1500, 'Sci-Fi', 'DRAFT');

INSERT INTO TurnDetails (challenge_id, num_of_sequences_completed) VALUES (1, 4);
INSERT INTO TurnDetails (challenge_id, num_of_sequences_completed) VALUES (2, 3);
INSERT INTO TurnDetails (challenge_id) VALUES (3);
INSERT INTO TurnDetails (challenge_id, num_of_sequences_completed) VALUES (4, 4);
INSERT INTO TurnDetails (challenge_id) VALUES (5);

INSERT INTO WordsPerChallenge (challenge_id, seq_num, word_list) VALUES (1, 1, ARRAY['death', 'murder', 'detective']);
INSERT INTO WordsPerChallenge (challenge_id, seq_num, word_list) VALUES (1, 2, ARRAY['criminal', 'sin', 'offence']);
INSERT INTO WordsPerChallenge (challenge_id, seq_num, word_list) VALUES (1, 3, ARRAY['trespass', 'wrongdoing', 'violation']);
INSERT INTO WordsPerChallenge (challenge_id, seq_num, word_list) VALUES (1, 4, ARRAY['misdemeanour', 'victim', 'hijack']);
INSERT INTO WordsPerChallenge (challenge_id, seq_num, word_list) VALUES (2, 1, ARRAY['daydream', 'delusion', 'hallucination']);
INSERT INTO WordsPerChallenge (challenge_id, seq_num, word_list) VALUES (2, 2, ARRAY['imagination', 'creativity', 'fiction']);
INSERT INTO WordsPerChallenge (challenge_id, seq_num, word_list) VALUES (2, 3, ARRAY['black', 'eerie', 'blindfolded']);
INSERT INTO WordsPerChallenge (challenge_id, seq_num, word_list) VALUES (4, 1, ARRAY['risk', 'reward', 'hazard']);
INSERT INTO WordsPerChallenge (challenge_id, seq_num, word_list) VALUES (4, 2, ARRAY['dangerous', 'voyage', 'gamble']);
INSERT INTO WordsPerChallenge (challenge_id, seq_num, word_list) VALUES (4, 3, ARRAY['jeopardize', 'stake', 'fable']);
INSERT INTO WordsPerChallenge (challenge_id, seq_num, word_list) VALUES (4, 4, ARRAY['tale', 'fear', 'twilight']);

INSERT INTO EssayPara (challenge_id, seq_num, author_id, essay_para, words_used)
VALUES (1, 1, 'oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'The death of a detective due to the murder scared the shit out of me.', ARRAY['death', 'murder', 'detective']);
INSERT INTO EssayPara (challenge_id, seq_num, author_id, essay_para, words_used)
VALUES (1, 2, 'JIcmq40600cn8YBLa0uBVv0fJZe2', 'We could not find the criminal who did the sin.', ARRAY['criminal', 'sin']);
INSERT INTO EssayPara (challenge_id, seq_num, author_id, essay_para, words_used)
VALUES (1, 3, 'oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'He trespass private territory, did the wrongdoing and successfully escaped.', ARRAY['trespass', 'wrongdoing']);
INSERT INTO EssayPara (challenge_id, seq_num, author_id, essay_para, words_used)
VALUES (1, 4, 'JIcmq40600cn8YBLa0uBVv0fJZe2', 'The victim died a sad death. Even his car got hijacked and destroyed.', ARRAY['victim', 'hijacked']);
INSERT INTO EssayPara (challenge_id, seq_num, author_id, essay_para, words_used)
VALUES (2, 1, 'fDudvKGcZ7Sn5AAnHLWMggR34R82', 'I thought it was a daydream. I thought it was a delusion. I thought it was a hallucination. But... it was not.', ARRAY['daydream', 'delusion', 'hallucination']);
INSERT INTO EssayPara (challenge_id, seq_num, author_id, essay_para, words_used)
VALUES (2, 2, 'UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'It was not my imagination nor my creativity that I am seeing before my eyes. Everything was not fiction.', ARRAY['imagination', 'creativity', 'fiction']);
INSERT INTO EssayPara (challenge_id, seq_num, author_id, essay_para, words_used)
VALUES (2, 3, 'fDudvKGcZ7Sn5AAnHLWMggR34R82', 'I was getting dragged by someone from my bed to my living room. I was blindfolded and everything was pitch black. There were also some eerie noise around me.', ARRAY['black', 'eerie', 'blindfolded']);
INSERT INTO EssayPara (challenge_id, seq_num, author_id, essay_para, words_used)
VALUES (4, 1, 'JIcmq40600cn8YBLa0uBVv0fJZe2', 'We took the risk, and hoped to get a reward worthy of it.', ARRAY['risk', 'reward']);
INSERT INTO EssayPara (challenge_id, seq_num, author_id, essay_para, words_used)
VALUES (4, 2, 'UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'Although it was dangerous, we decided to gamble on the voyage to the mysterious dragon island.', ARRAY['dangerous', 'voyage', 'gamble']);
INSERT INTO EssayPara (challenge_id, seq_num, author_id, essay_para, words_used)
VALUES (4, 3, 'JIcmq40600cn8YBLa0uBVv0fJZe2', 'The journey could jeopardize our live, but the fable we heard said the reward was as high as the stake.', ARRAY['jeopardize', 'stake', 'fable']);
INSERT INTO EssayPara (challenge_id, seq_num, author_id, essay_para, words_used)
VALUES (4, 4, 'UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'Upon reaching the dragon island at twilight, we discovered the tale was true. We were standing in front of a huge dragon, shaking in fear.', ARRAY['tale', 'fear', 'twilight']);

INSERT INTO EssayNut (user_id, challenge_id, seq_num, nut) VALUES ('oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 1, 1, 3);
INSERT INTO EssayNut (user_id, challenge_id, seq_num, nut) VALUES ('JIcmq40600cn8YBLa0uBVv0fJZe2', 1, 2, 2);
INSERT INTO EssayNut (user_id, challenge_id, seq_num, nut) VALUES ('oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 1, 3, 2);
INSERT INTO EssayNut (user_id, challenge_id, seq_num, nut) VALUES ('JIcmq40600cn8YBLa0uBVv0fJZe2', 1, 4, 2);
INSERT INTO EssayNut (user_id, challenge_id, seq_num, nut) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 2, 1, 3);
INSERT INTO EssayNut (user_id, challenge_id, seq_num, nut) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 2, 2, 3);
INSERT INTO EssayNut (user_id, challenge_id, seq_num, nut) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 2, 3, 3);
INSERT INTO EssayNut (user_id, challenge_id, seq_num, nut) VALUES ('JIcmq40600cn8YBLa0uBVv0fJZe2', 4, 1, 2);
INSERT INTO EssayNut (user_id, challenge_id, seq_num, nut) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 4, 2, 3);
INSERT INTO EssayNut (user_id, challenge_id, seq_num, nut) VALUES ('JIcmq40600cn8YBLa0uBVv0fJZe2', 4, 3, 3);
INSERT INTO EssayNut (user_id, challenge_id, seq_num, nut) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 4, 4, 3);

INSERT INTO CommunityChallengeNut (upvoter_user_id, upvoted_user_id, challenge_id) VALUES ('oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'JIcmq40600cn8YBLa0uBVv0fJZe2', 4);
INSERT INTO CommunityChallengeNut (upvoter_user_id, upvoted_user_id, challenge_id) VALUES ('oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'UY8F8bckPGMYJYcjDVATXjuK9Qx2', 4);
INSERT INTO CommunityChallengeNut (upvoter_user_id, upvoted_user_id, challenge_id) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'JIcmq40600cn8YBLa0uBVv0fJZe2', 4);
INSERT INTO CommunityChallengeNut (upvoter_user_id, upvoted_user_id, challenge_id) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'UY8F8bckPGMYJYcjDVATXjuK9Qx2', 4);
INSERT INTO CommunityChallengeNut (upvoter_user_id, upvoted_user_id, challenge_id) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 1);
INSERT INTO CommunityChallengeNut (upvoter_user_id, upvoted_user_id, challenge_id) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'JIcmq40600cn8YBLa0uBVv0fJZe2', 1);
INSERT INTO CommunityChallengeNut (upvoter_user_id, upvoted_user_id, challenge_id) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 1);
INSERT INTO CommunityChallengeNut (upvoter_user_id, upvoted_user_id, challenge_id) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'JIcmq40600cn8YBLa0uBVv0fJZe2', 1);

INSERT INTO CommunityEssayNut (upvoter_user_id, upvoted_user_id, challenge_id, seq_num) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 1, 1);
INSERT INTO CommunityEssayNut (upvoter_user_id, upvoted_user_id, challenge_id, seq_num) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 1, 3);
INSERT INTO CommunityEssayNut (upvoter_user_id, upvoted_user_id, challenge_id, seq_num) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'JIcmq40600cn8YBLa0uBVv0fJZe2', 1, 2);
INSERT INTO CommunityEssayNut (upvoter_user_id, upvoted_user_id, challenge_id, seq_num) VALUES ('UY8F8bckPGMYJYcjDVATXjuK9Qx2', 'JIcmq40600cn8YBLa0uBVv0fJZe2', 1, 4);
INSERT INTO CommunityEssayNut (upvoter_user_id, upvoted_user_id, challenge_id, seq_num) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'JIcmq40600cn8YBLa0uBVv0fJZe2', 4, 1);
INSERT INTO CommunityEssayNut (upvoter_user_id, upvoted_user_id, challenge_id, seq_num) VALUES ('fDudvKGcZ7Sn5AAnHLWMggR34R82', 'JIcmq40600cn8YBLa0uBVv0fJZe2', 4, 3);
INSERT INTO CommunityEssayNut (upvoter_user_id, upvoted_user_id, challenge_id, seq_num) VALUES ('oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'UY8F8bckPGMYJYcjDVATXjuK9Qx2', 4, 2);
INSERT INTO CommunityEssayNut (upvoter_user_id, upvoted_user_id, challenge_id, seq_num) VALUES ('oDvs8LMf8JQG4WWMCChvJ0WRQAh1', 'UY8F8bckPGMYJYcjDVATXjuK9Qx2', 4, 4);
