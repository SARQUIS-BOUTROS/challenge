const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { URL_ROOT , PORT, DB_NAME, DB_CONNECTION} = require('./constants');
const serviceOrder = require('./Routes/service-request');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const mongoose = require('mongoose');

mongoose.connect(`mongodb://${DB_CONNECTION}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is conected to', db.connection.host))
    .catch(err => console(err))

app.listen(PORT, () =>
    console.log(
        `¡Aplicación de ejemplo escuchando en el puerto ${PORT}`
    )
);

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
    },
    servers: [
        {
            url: `${URL_ROOT}`,
            description: 'Development server',
        },
    ]
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ["./src/Routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);


// cross-origin-requests
app.use(cors());
app.use(cookieParser());
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false })); --before
// parse application/json
//app.use(bodyParser.json()); --before

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Put payments router before auth middleware to avoid authentication on B2B communication with MercadoPago

app.use('/', serviceOrder);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//module.exports = app;