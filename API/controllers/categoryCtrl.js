'use strict';
//             Category 
var mongoose = require('mongoose'),
    Category = mongoose.model('Categories'),
    Trip = mongoose.model('Trips');

//Create Category
exports.create_an_category = function (req, res) {
   
    var new_category = new Category(req.body);
    new_category.save(function (err, category) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(category);
        }
    });
};

// List all Category
exports.list_all_category = function (req, res) {


    Category.find(function (err, categories) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(categories);
        }
    });
};

// Read an category
exports.read_an_category = function (req, res) {
    Category.findById(req.params._id, function (err, actor) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(actor);
      }
    });
  };

// Delete withoutrip
exports.delete_an_category_witout_trip = function (req, res) {
    console.log(req.params);

    var query = {
        "category": (req.params._id),
        "status": {
            "$ne": "CANCELLED"
        }

    };


    Trip.find(query, function (err, category) {
        if (err) {
            res.send(err);
        }
        else {
            if (category.length > 0) {

                res.status(405).json({ message: 'You can not delete this category, this category is assigned to a one or more trip' });
                return;
            } else {
                var querydelete = {
                    "$and": [
                        {
                            _id: req.params._id
                        }

                    ]
                };

                Category.deleteOne(querydelete, function (err, category) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        if (category.deletedCount < 1) {
                            res.json({ message: 'Category not deleted, is already started' });
                        } else {
                            res.json({ message: 'Category successfully deleted' });
                        }
                    }
                });
            }
        }
    });




};


// Update category
exports.update_category = function (req, res) {

    Category.findOneAndUpdate(
        { _id: req.params._id },
        req.body,
        { new: true },
        function (err, categories) {

            if (err) {
                res.send(err);
            }

            else {
                res.json(categories);
            }
        });
};


exports.search_category = (req, res) => {
    // console.log(req.query); 
    // /v1/category/search?q=viaje&sortedBy=created&reverse=true&pageSize=3&startFrom=3
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

    Category.find(keyWordQuery)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .lean()
        .exec((err, categories) => {
            if (err) {
                res.send(err);
            } else {
                res.send(categories);
            }
        });


};