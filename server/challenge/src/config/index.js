import dotenv from 'dotenv';
export const port = process.env.PORT;

export const error_messages = {
    NO_SUCH_CHALLENGE_FOUND: "Not found. No such challenge found.",
    INVALID_FIELDS: "Bad Request. Invalid fields.",
    MISSING_FIELDS: "Bad Request. Missing fields.",
    INTERNAL_ERROR: "Something went wrong.",
    WRONG_TURN: "Forbidden. Not this user's turn.",
    NOT_IN_THIS_CHALLENGE: "Forbidden. Not part of this incomplete challenge",
    CHALLENGE_ACCEPTED: "Forbidden. Challenge already accepted",
    NOT_AUTHENTICATED: "User is not authenticated",
    USER_ALREADY_IN_CHALLENGE: "Forbidden. User is already in challenge"
}

dotenv.config();

export const POSTGRES_URL = process.env.POSTGRES_URL;

export const OK_MESSAGE = "OK";