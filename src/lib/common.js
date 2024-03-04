const configValues = require('../../config/configValues');


async function getConfiguration() {
    return {...configValues};
}

module.exports = {
    getConfiguration,
}