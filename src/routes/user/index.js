const {
    SignUpReq,
    SignUpRes,
    LoginReq,
    LoginRes,
    // GetListUserQuery,
    // GetListUserRes,
} = require('./schema');

const {
    signUp,
    login,
    getUsers,
} = require('./user');


// CRUD for users
module.exports = server => {
    // POST /users/signUp
    server.route({
        method: 'POST',
        path: '/users/signUp',
        options: {
            auth: false,
            description: 'signUp user account',
            notes: 'CRUD for user',
            tags: ['api'],
            response: { schema: SignUpRes },
            validate: {
                payload: SignUpReq,
            },
        },
        handler: signUp,
    });

    // POST /users/login
    server.route({
        method: 'POST',
        path: '/users/login',
        options: {
            auth: false,
            description: 'login user account',
            notes: 'CRUD for user',
            tags: ['api'],
            response: { schema: LoginRes },
            validate: {
                payload: LoginReq,
            },
        },
        handler: login,
    });

    // GET /users
    server.route({
        method: 'GET',
        path: '/users',
        options: {
            auth: 'jwt',
            description: 'get list user account',
            notes: 'CRUD for user',
            tags: ['api'],
            // response: { schema: GetListUserRes },
            // validate: {
            //     query: GetListUserQuery,
            // },
        },
        handler: getUsers,
    });

    return server;
};
