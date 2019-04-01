'use strict';

var mongoose = require('mongoose'),
  Finder = mongoose.model('Finders');



exports.create_a_finder = function (req, res) {
    console.log((req.body));
    var new_finder = new Finder(req.body);
    new_finder.save(function (err, finder) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(finder);
        }
    });
};

exports.update_a_finder = function (req, res) {
    Finder.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, finder) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(finder);
        }
    });
  };

exports.read_a_finder = function (req, res) {
  Finder.findById(req.params.actorID, function (err, finder) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(finder);
    }
  });
};

exports.list_all_finders = function (req, res) {
    
  };