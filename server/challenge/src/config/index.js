export const port = process.env.PORT;
export const db = process.env.POSTGRES_URL;

export const error_messages = {
    NO_SUCH_CHALLENGE_FOUND: "Not found. No such challenge found.",
    INVALID_FIELDS: "Bad Request. Invalid fields.",
    MISSING_FIELDS: "Bad Request. Missing fields.",
    INTERNAL_ERROR: "Something went wrong.",
    WRONG_TURN: "Forbidden. Not this user's turn.",
}

export const OK = "OK";