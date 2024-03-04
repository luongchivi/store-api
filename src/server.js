const Database = require('./database');
const {
    getConfiguration,
} = require('./lib/common');
const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert'); // Required for hapi-swagger
const Vision = require('@hapi/vision'); // Required for hapi-swagger
const { name: title, version } = require('../package.json');
const dotenv = require('dotenv');
dotenv.config();

// Routes API endpoint
const initRoutes = require('./routes');
// BearerAuthentication plugins
const { registerAuthStrategy } = require("./plugins/bearerAuthentication");

let db;

const swaggerOptions = {
    info: {
        title,
        version,
    },
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            description: 'Value: Bearer {jwt}',
            name: 'Authorization',
            in: 'header',
        },
    },
    security: [{ Bearer: [] }],
};

async function createServer() {
    const configuration = await getConfiguration();
    db = await Database.init(configuration);

    const serverConfig = {
        routes: {
            validate: {
                failAction: async (request, h, err) => {
                    console.error(err);
                    throw Boom.badRequest(err.message);
                },
            },
            cors: {
                origin: ['*'],
                additionalExposedHeaders: [
                    'Content-Disposition',
                    'Content-Length',
                    'X-Ait-ActionTrackingId',
                ],
            },
            auth: 'Bearer',
            payload: {
                maxBytes: 1048576 * 30, // 30 MiB
                // uploads: path.join(os.tmpdir(), SERVICE_NAME),
            },
            response: {
                failAction: async (request, h, err) => {
                    console.log(`Response validation failed: ${request.method.toUpperCase()} ${request.path}`);
                    console.warn(err);

                    return h.continue;
                },
            },
        },
        port: process.env.SERVICE_PORT,
    };

    const server = Hapi.server(serverConfig);
    server.app.db = db;

    await registerAuthStrategy(server);

    initRoutes(server);

    await server.register([
        Inert,
        Vision,
        { plugin: HapiSwagger, options: swaggerOptions },
    ]);

    return server;
}

const startServer = async () => {
    const server = await createServer();
    await server.start();
    console.log(`Server running on ${server.info.uri}`);

    return server;
};

const stopServer = async server => {
    await server.app.db.connectionManager.close();
    await server.stop();
};

process.on('unhandledRejection', err => {
    console.trace();
    console.log(err);
    process.exit(1);
});

process.on('SIGTERM', () => { stopServer(); });

module.exports = { startServer, stopServer };
