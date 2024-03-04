const Jwt = require('@hapi/jwt');

const validate = async (decoded, request, h) => {
    // Perform any additional checks here if needed
    return { isValid: true };
};

const jwtStrategy = {
    keys: process.env.SECRET_KEY, // Your secret key
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

module.exports = {
    registerAuthStrategy,
}