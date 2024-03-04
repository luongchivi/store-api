const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
dotenv.config();
const {
    decodeRequest,
    buildErrorResponse,
    buildSuccessResponse,
    buildResponseMessage,
} = require('../shared');
const { userTypeEnum} = require("./schema");
const Boom = require('@hapi/boom');


async function signUp(request, h) {
    try {
        const { payload, db } = decodeRequest(request);
        const id = uuidv4();
        // Hash the password, you can adjust the saltRounds value (e.g., 10) as per your requirements
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        payload.password = hashedPassword;

        // Create the user with the hashed password
        const user = await db.models.User.create({
            id,
            userType: userTypeEnum.USER,
            ...payload,
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

        // Generate JWT token with 1 hours expiration time
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        return buildSuccessResponse(h, { token }, 200);
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