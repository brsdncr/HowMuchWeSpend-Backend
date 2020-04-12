module.exports = {
    INVALID_TOKEN: {
        "status": 403,
        "message": "Invalid Token - Login Needed"
    },
    TOKEN_EXPIRED: {
        "status": 403,
        "message": "Token Expired - Login Needed"
    },
    USER_EXISTS: {
        "status": 400,
        "message": "User already exists"
    },
    USER_CREATION_ERROR: {
        "status": 400,
        "message": "An error occured while creating the user"
    },
    INVALID_USERNAME_PASSWORD: {
        "status": 400,
        "message": "Username - Password combination does not match"
    },
    USER_NOT_FOUND: {
        "status": 400,
        "message": "Username - Password combination does not match"
    },
    UNKNOWN_ERROR: {
        status: 400,
        message: "An unknown error occured"
    }
}