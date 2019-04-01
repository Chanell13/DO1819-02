var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    app = express();

var admin = (process.env.mongoDBHostname === "mongo" || process.env.mongoDBHostname === 'mongodb-svc' || process.env.mongoDBHostname === '172.17.0.2') ? '' : require('firebase-admin');
var serviceAccount = (process.env.mongoDBHostname === "mongo" || process.env.mongoDBHostname === 'mongodb-svc' || process.env.mongoDBHostname === '172.17.0.2') ? ''
    : require('./acme-explorer-1176d-firebase-adminsdk-hpy9v-2636ee199c.json');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (admin != '') {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://acme-explorer-1176d.firebaseio.com"
    });
}

var routesActors = require('./API/routes/actorsRoutes'),
    routesApplications = require('./API/routes/applicationsRoutes'),
    routesDataWareHouse = require('./API/routes/dataWareHouseRoutes'),
    routesLogin = require('./API/routes/loginRoutes'),
    routesTrips = require('./API/routes/tripsRoutes'),
    routesStore = require('./API/routes/storeRoutes');

module.exports = app,
    routesActors(app),
    routesApplications(app),
    routesDataWareHouse(app),
    routesLogin(app),
    routesStore(app),
    routesTrips(app);