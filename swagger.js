const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'Artists Api',
        description: 'Artists Api'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
};
const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles,doc);