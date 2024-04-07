const Jwt = require('@hapi/jwt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const validate = async (decoded, request, h) => {
    // Perform any additional checks here if needed
    return { isValid: true };
};

const jwtStrategy = {
    keys: process.env.ACCESS_TOKEN_SECRET_KEY,
    verify: {
        aud: false,
        iss: false,
        sub: false,
        nbf: true,
        exp: true,
        maxAgeSec: 14400, // 4 hours
    },
    validate,
};

const registerAuthStrategy = async (server) => {
    await server.register(Jwt);
    server.auth.strategy('jwt', 'jwt', jwtStrategy);
    server.auth.default('jwt'); // Set the default authentication strategy to jwt
};

// Generate JWT accessToken with 1 min expiration time and refreshToken with 30 days expiration time
const generateAccessToken = (data) => {
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1m' })
    return accessToken;
}

const generateRefreshToken = (data) => {
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '30d' })
    return refreshToken;
}

module.exports = {
    registerAuthStrategy,
    generateAccessToken,
    generateRefreshToken,
}