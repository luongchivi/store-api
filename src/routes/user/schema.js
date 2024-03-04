const Joi = require('joi');


const userTypeEnum = {
    ADMIN: 'admin',
    USER: 'user',
}

const defaultSchema = Joi.object({
    id: Joi.string()
        .alter({
            post: schema => schema.forbidden(),
        }),
    username: Joi.string()
        .alter({
            post: schema => schema.required(),
        }),
    password: Joi.string()
        .alter({
            post: schema => schema.required(),
        }),
    userType: Joi.string().valid(...Object.values(userTypeEnum))
        .alter({
            post: schema => schema.forbidden(),
        }),
    // Automatic timestamps created by Sequelize, for response only
    createdAt: Joi.date().iso().allow(null)
        .alter({
            post: schema => schema.forbidden(),
        }),
    updatedAt: Joi.date().iso().allow(null)
        .alter({
            post: schema => schema.forbidden(),
        }),
});

const SignUpReq = defaultSchema
    .tailor('post')
    .label('SignUp request')
    .description('SignUp request');

const SignUpRes = Joi.object({
    results: Joi.object({
        message: Joi.string().required(),
    })
})
    .tailor('post')
    .label('SignUp response')
    .description('SignUp response');

const LoginReq = defaultSchema
    .tailor('post')
    .label('Login request')
    .description('Login request');

const LoginRes = Joi.object({
    results: Joi.object({
        token: Joi.string().required(),
    })
})
    .tailor('post')
    .label('Login response')
    .description('Login response');

module.exports = {
    userTypeEnum,
    SignUpRes,
    SignUpReq,
    LoginReq,
    LoginRes,
}