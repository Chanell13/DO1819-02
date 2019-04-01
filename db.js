require('./API/model/applicationsModel'),
    require('./API/model/tripsModel'),
    require('./API/model/actorsModel'),
    require('./API/model/bannerModel'),
    require('./API/model/finderModel'),
    require('./API/model/dataWareHouseModel');

var mongoose = require('mongoose');

// MongoDB URI buildingmongodb-svc
var mongoDBUser = (process.env.mongoDBHostname === "mongo"
    || process.env.mongoDBHostname === '172.17.0.2'
    || process.env.mongoDBHostname === 'mongodb-svc') ? ""
    : process.env.mongoDBUser || "myAdmin";

var mongoDBPass = (process.env.mongoDBHostname === "mongo"
    || process.env.mongoDBHostname === '172.17.0.2'
    || process.env.mongoDBHostname === 'mongodb-svc') ? ""
    : process.env.mongoDBPass || "myAdminPassword";

var mongoDBCredentials =
    (mongoDBUser && mongoDBPass) ? mongoDBUser + ":" + mongoDBPass + "@" : "";

var mongoDBHostname = process.env.mongoDBHostname || "localhost";
var mongoDBPort = process.env.DBPORT || "27017";
var mongoDBName = process.env.mongoDBName || "ACME-Explorer";

var mongoDBURI =
    "mongodb://" + mongoDBCredentials + mongoDBHostname + ":" + mongoDBPort + "/" + mongoDBName;

mongoose.connect(mongoDBURI, {
    useCreateIndex: true,
    reconnectTries: 10,
    reconnectInterval: 500,
    poolSize: 4, // Up to 4 sockets
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // skip trying IPv6
    useNewUrlParser: true
});

console.log("Connecting DB to: " + mongoDBURI);

mongoose.connection.on("open", function (err, conn) {
    console.log('DB conected!!');
});

mongoose.connection.on("error", function (err, conn) {
    console.error("DB init error " + err);
    process.exit(1);
});

module.exports = mongoose;