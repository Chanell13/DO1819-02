'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var ActorSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the actor name'
    },
    surname: {
        type: String,
        required: 'Kindly enter the actor surname'
    },
    email: {
        type: String,
        required: 'Kindly enter the actor email',
        //It is necessary to comment on this line to enter large amounts of data
        //unique: true
        validate: [emailValidation, "invalid emmail"]
    },
    password: {
        type: String,
        minlength: 5,
        required: 'Kindly enter the actor password'
    },
    phone: {
        type: String,

    },
    address: {
        type: String
    },
    role: [{
        type: String,
        required: 'Kindly enter the user role(s)',
        enum: ['ADMINISTRATOR', 'MANAGER', 'EXPLORER', 'SPONSOR']
    }],
    customToken: {
        type: String
    },
    preferredLanguage: {
        type: String,
        default: 'es'
    },
    created: {
        type: Date,
        default: Date.now
    }
},
    { strict: false }
);

// Custom validation for email
function emailValidation(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value);
};

ActorSchema.pre('save', function (callback) {
    var actor = this;
    // Break out if the password hasn't changed
    if (!actor.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(actor.password, salt, function (err, hash) {
            if (err) return callback(err);
            actor.password = hash;
            callback();
        });
    });
});

ActorSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        console.log('verifying password in actorModel: ' + password);
        if (err) return cb(err);
        console.log('isMatch: ' + isMatch);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Actors', ActorSchema);