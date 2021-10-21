export const port = process.env.PORT;

export const error_messages = {
    NO_SUCH_CHALLENGE_FOUND: "Not found. No such challenge found.",
    INVALID_FIELDS: "Bad Request. Invalid fields.",
    MISSING_FIELDS: "Bad Request. Missing fields.",
    INTERNAL_ERROR: "Something went wrong.",
    WRONG_TURN: "Forbidden. Not this user's turn.",
    NOT_IN_THIS_CHALLENGE: "Not part of this incomplete challenge",
}


const dotenv = require('dotenv');
dotenv.config();

export const POSTGRES_URL = process.env.POSTGRES_URL;

export const OK_MESSAGE = "OK";