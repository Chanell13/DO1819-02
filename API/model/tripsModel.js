'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const moment = require('moment');
const dateFormat = require('dateformat'),
    generate = require('nanoid/generate');

var stagechema = new Schema({
    title: {
        type: String,
        required: 'Kindly enter the title of the Stage'
    },
    description: {
        type: String,
        required: 'Kindly enter the description of the Stage'
    },
    price: {
        type: Number,
        default: 0.00
    },
    created: {
        type: Date,
        default: Date.now
    }
}, { strict: false });

var TripSchema = new Schema({
    manager: {
        type: mongoose.ObjectId,
        ref: 'Actor',
        required: 'Kindly enter a valid manager of trip'
    },
    ticker: {
        //    This validation does not run after middleware pre-save 
        //    required: 'Kindly enter the ticker of the Trip',
        type: String,
        unique: true,
        validate: [
            validator,
            'ticker is not valid!, Pattern("\d(6)-\w(4)")'
        ]
    },
    cancelled_reason: {
        type: String
    },
    title: {
        type: String,
        required: 'Kindly enter the title of the Trip'
    },
    cancelationMoment: {
        type: Date,
        default: null
    },
    description: {
        type: String,
        required: 'Kindly enter the description of the Trip'
    },
    price: {
        type: Number
    },
    list_requirements: {
        type: [String] //['adios','hola']
    },
    status: {
        type: String,
        enum: ['CREATED', 'PUBLISHED', 'CANCELLED'],
        default: 'CREATED'
    },
    date_start: {
        type: Date,
        validate: [
            startDateValidator,
            'Start date must be greater than Today date'
        ],
        required: 'Kindly enter the start of the Trip'
    },
    date_end: {
        type: Date,
        required: 'Kindly enter the end of the Trip',
        validate: [
            dateValidation,
            'Date end must be higher than date start'
        ]
    },
    picture: [{
        data: Buffer,
        contentType: String
    }],
    stage: [stagechema],
    created: {
        type: Date,
        default: Date.now
    }

}, { strict: false });

TripSchema.pre('save', function (callback) {
    var new_trip = this;
    var totalPrice = 0;
    new_trip.price = 0;

    new_trip.stage.forEach(element => {
        totalPrice += element.price;
    });
    new_trip.price = totalPrice;

    var day = dateFormat(new Date(), "yymmdd");

    var generated_ticker = [day, generate('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)].join('-')
    new_trip.ticker = generated_ticker;

    callback();
});

function dateValidation(value) {
    return this.date_start <= value;
}

function validator(v) {
    return /\d{6}-\w{4}/.test(v);
}

function startDateValidator(startDate) {
    let now = moment();
    return now <= startDate;
}

TripSchema.index({ ticker: 'text', title: 'text', description: 'text' });
TripSchema.index({ price: 1 });
TripSchema.index({ cancelationMoment: 1 });

module.exports = mongoose.model('Trips', TripSchema);
module.exports = mongoose.model('Stages', stagechema);