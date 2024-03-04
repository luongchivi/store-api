const Joi = require('joi');


function buildSuccessResponse(h, result, code = 200) {
    return h
        .response({
            results: Object.prototype.hasOwnProperty.call(result, 'toJSON') ? result.toJSON() : result,
        })
        .code(code);
}

function buildErrorResponse(h, errorMessage, errorCode, payload = undefined) {
    if (payload.isBoom) {
        const { output } = payload;
        return h
            .response({
                errorMessage,
                errorCode: output.statusCode,
                payload: output.payload,
            })
            .code(output.statusCode);
    }

    if (payload.response) {
        return h
            .response({
                errorMessage,
                errorCode: payload.status,
                payload: payload.response.body,
            })
            .code(payload.status);
    }

    return h
        .response({
            errorMessage,
            errorCode,
            payload,
        })
        .code(errorCode);
}

/**
 * Helper function to decode useful data in the request object.
 *
 * @param {object} request
 */
const decodeRequest = request => {
    const {
        auth,
        params,
        query,
        payload,
        server,
        headers,
    } = request;
    const { app } = server;
    const { credentials: user } = auth;

    return {
        params,
        query,
        payload,
        ...app,
        auth,
        user,
        headers,
    };
};

function buildResponseMessage(h, message, code = 200) {
    return h
        .response({
            results: { message },
        })
        .code(code);
}

function resultListToResponse(results, total, totalUnfiltered, limit = 100) {
    const temp = total % limit;
    let totalPages = parseInt(total / limit, 10);
    if (temp > 0) {
        totalPages += 1;
    }

    return {
        results,
        total,
        totalUnfiltered,
        totalPages,
    };
}

const createSchema = (itemSchemaKeys, name) => (Joi
    .object({
        results: itemSchemaKeys,
    })
    .label(name || 'no name given for schema')
    .description(`${name || 'no name given for schema'} response`));

module.exports = {
    decodeRequest,
    buildErrorResponse,
    buildSuccessResponse,
    buildResponseMessage,
    resultListToResponse,
    createSchema,
};