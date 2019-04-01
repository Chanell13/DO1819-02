'use strict';
//             TRIPS 
var mongoose = require('mongoose'),
    Trip = mongoose.model('Trips'),
    Application = mongoose.model('Applications');

exports.create_an_trip = function (req, res) {
    //Check if the user is an manager and if not: res.status(403); 
    //"an access token is valid, but requires more privileges"
    // console.log((req.body));
    var new_trip = new Trip(req.body);
    new_trip.save(function (err, trip) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(trip);
        }
    });
};

exports.list_all_trips = function (req, res) {
    Trip.find(function (err, trips) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(trips);
        }
    });
};

exports.list_all_trips_status = function (req, res) {
    //Check if status param exists (status: req.keyWordQuery.status)  

    Trip.find(function (err, trips) {
        if (trip.status == 'PUBLISHED') {
            if (err) {
                res.send(err);
            }
        }
        else {
            // res.append('Trip returned from the trip search');
            console.log("No hay viajes que mostrar");
            res.json(trips);
        }
    });

    console.log('Searching an trip depending on params');
};

exports.list_a_trip = function (req, res) {
    //Check if status param exists (status: req.keyWordQuery.status)  
    Trip.find({ ticker: req.params.ticker }, function (err, trip) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(trip);
        }
    });
    console.log('Searching an trip depending on params');
};

exports.update_an_trip = function (req, res) {
    // console.log((req.body));
    if (req.body.ticker) {
        res.sendStatus(409);
        return;
    }

    if (req.body.status) {
        res.sendStatus(409);
        return;
    }

    req.body.price = 0;
    var updatedPrice = 0;
    req.body.stage.forEach(element => {
        updatedPrice += element.price;
    });
    req.body.price = updatedPrice;

    Trip.findOneAndUpdate(
        { ticker: req.params.ticker },
        req.body,
        { new: true },
        function (err, trip) {
            if (trip.status != 'PUBLISHED') {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(trip);
                }
            }
            else {
                res.status(405).json({ message: 'Update trip with status PUBLISHED is not allowed' });
            }
        });
};



exports.delete_an_trip_witout_app = function (req, res) {
    var query = {
        "trip": (req.params._id),
        "status": {
            "$ne": "CANCELLED"
        }
    };

    Application.find(query, function (err, applications) {
        if (err) {
            res.send(err);
        }
        else {
            if (applications.length > 0) {

                res.status(405).json({ message: 'You can not delete this trip, have one or more applications' });
                return;
            } else {
                var querydelete = {
                    "$and": [
                        { _id: req.params._id },
                        {
                            "date_start": { "$gte": new Date() }
                        }
                    ]
                };

                Trip.deleteOne(querydelete, function (err, trip) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        if (trip.deletedCount < 1) {
                            res.json({ message: 'Trip not deleted, is already started' });
                        } else {
                            res.json({ message: 'Trip successfully deleted' });
                        }
                    }
                });
            }
        }
    });
};

exports.change_status_trip = function (req, res) {

    var reason = (req.body.cancelled_reason) ? req.body.cancelled_reason : '';

    if (req.body.status == 'CANCELLED' && reason == '') {
        res.status(400).json({ message: 'Missing value cancel reason' });
        return;
    } else if (req.body.status != 'PUBLISHED') {
        req.body.cancelationMoment = new Date();
    } else
        req.body.cancelationMoment = null;

    console.log(req.params);
    console.log(req.body);

    Trip.findOneAndUpdate(
        { ticker: req.params.ticker },
        req.body,
        { new: true },
        function (err, trip) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ message: 'Trip status successfully changed' });
            }
        });
};

exports.search_trips = (req, res) => {
    // console.log(req.query); 
    // /v1/trips/search?q=viaje&sortedBy=created&reverse=true&pageSize=3&startFrom=3
    var keyWordQuery = {};

    if (req.query.q) {
        keyWordQuery.$text = { $search: req.query.q };
    }

    var skip = 0;
    if (req.query.startFrom) {
        skip = parseInt(req.query.startFrom);
    }

    var limit = 0;
    if (req.query.pageSize) {
        limit = parseInt(req.query.pageSize);
    }

    var sort = "";
    if (req.query.reverse) {
        if (req.query.sortedBy) {
            if (req.query.reverse == "true") sort = "-";
            sort += req.query.sortedBy;
        } else {
            res.status(400).json({ message: 'Missing query parameter sortedBy' });
            return;
        }
    }

    Trip.find(keyWordQuery)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .lean()
        .exec((err, trip) => {
            if (err) {
                res.send(err);
            } else {
                res.send(trip);
            }
        });


};


exports.change_status_trip_applications = function (req, res) {

    //PUT Change the status the trip's applications.
};

exports.list_trip_applications_id = function (req, res) {

    //GET for id Change the status the trip's applications.
};

exports.search_list_all_applications_trip = function (req, res) {

    //GET Change the status the trip's applications.
};


exports.pay_application = function (req, res) {
    //Check that the status is "DUE"
    var applicationId = req.params._id;
    Application.findOne({ _id: applicationId }, function (err, application) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            if (application.status == "DUE") {
                Application.findOneAndUpdate({ _id: applicationId }, { status: "ACCEPTED", if_paid: true }, { new: true }, function (err, application) {
                    if (err) {
                        if (err.name == 'ValidationError') {
                            res.status(422).send(err);
                        } else {
                            res.status(500).send(err)
                        }
                    }
                    else {
                        res.json(application);
                    }
                });
            }
            else {
                res.status(400).send({ message: 'Cannot pay an application because the status is not DUE' })
            }

        }
    })

};
