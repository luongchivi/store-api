const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const {
    decodeRequest,
    buildErrorResponse,
    buildSuccessResponse,
    buildResponseMessage,
} = require('../shared');
const Boom = require('@hapi/boom');
const { generateAccessToken, generateRefreshToken } = require('../../plugins/bearerAuthentication')
dotenv.config();


async function signUp(request, h) {
    try {
        const { payload, db } = decodeRequest(request);
        const { password, username } = payload;
        // Hash the password, you can adjust the saltRounds value (e.g., 10) as per your requirements
        const hashedPassword = await bcrypt.hash(password, 10);

        const userRole = await db.models.UserRole.findOne({
           where: {
               userRoleName: 'User',
           }
        });

        const user = await db.models.User.findOne({
            where: {
                username,
            }
        });

        if (user) {
            throw Boom.notFound('This username already existed');
        }

        // Create the user with the hashed password
        await db.models.User.create({
            id: uuidv4(),
            userRoleId: userRole.id,
            isStatus: true,
            username,
            password: hashedPassword,
        });

        // TODO need create service send email to verify account
        return buildResponseMessage(h, 'Create user successfully', 200);
    } catch (error) {
        return buildErrorResponse(h, 'Creating Project failed', 400, error);
    }
}

async function login(request, h) {
    try {
        const { payload, db } = decodeRequest(request);
        const { username, password } = payload;

        // Find the user by username
        const user = await db.models.User.findOne({
            where: {
                username,
            }
        });

        if (!user) {
            throw Boom.notFound('User not found');
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return buildErrorResponse(h, 'Invalid username or password', 401);
        }

        const accessToken = generateAccessToken({ userId: user.id });
        const refreshToken = generateRefreshToken({ userId: user.id });
        return buildSuccessResponse(h, { accessToken, refreshToken }, 200);
    } catch (error) {
        return buildErrorResponse(h, 'Login failed', 400, error);
    }
}

async function getUsers(request, h) {
    try {
        const { query, db } = decodeRequest(request);

        // Find all the users
        const users = await db.models.User.findAndCountAll();

        if (!users) {
            throw Boom.notFound('User not found');
        }

        return {
            results: users.rows,
        }
    } catch (error) {
        return buildErrorResponse(h, 'Login failed', 400, error);
    }
}

module.exports = {
    signUp,
    login,
    getUsers,
}