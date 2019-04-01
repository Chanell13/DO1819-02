'use strict';
module.exports = function (app) {
  var trip = require('../controllers/tripsCtrl');
  var authController = require('../controllers/authCtrl');

  /**
   * Post an trip
   * Get an trip
   * RequiredRoles: None
   * @section trip
   * @type post get
   * @url /v1/trips
   * @param {string} sortedBy (category)
  */
  app.route('/v1/trips')
    .post(trip.create_an_trip)
    .get(trip.list_all_trips);

  /**
   * get results from a search engine
   * RequiredRoles: None
   * @section trips
   * @type get
   * @url /v1/trips/search
   * @param {string} startFrom
   * @param {string} pageSize
   * @param {string} sortedBy (created)
   * @param {string} reverse (true|false) 
   * @param {string} keyword //in ticker, title, or description
  */
  app.route('/v1/trips/search')
    .get(trip.search_trips);

  /**
   * Put an trip
   * RequiredRoles: None
   * @section trips
   * @type put
   * @url /v1/trips/:ticker
  */
  app.route('/v1/trips/:ticker')
    .put(trip.update_an_trip);

  /**
    * Delete an trip
    * RequiredRoles: Manager
    * @section trips
    * @type delete
    * @url /v1/trips/:_id
   */
  app.route('/v1/trips/:_id')
    .delete(trip.delete_an_trip_witout_app);

  /**
    * Put an trip
    * RequiredRoles: Manager
    * @section trip
    * @type put 
    * @url /v1/trips/:ticker/status
   */
  app.route('/v1/trips/:ticker/status')
    .put(trip.change_status_trip);

  /**
   * Get an trip
   * RequiredRoles: Explorer
   * @section trip
   * @type get
   * @url /v2/trips
  */
  app.route('/v2/trips')
    .get(authController.verifyUser(['EXPLORER']),
      trip.list_all_trips_status);

  /**
   * Get an trip
   * Post an trip
   * RequiredRoles: Manager
   * @section trip
   * @type get post
   * @url /v2/trips/:ticker
  */
  app.route('/v2/trips/:ticker')
    .get(trip.list_a_trip)
    .post(authController.verifyUser(['MANAGER']),
      trip.create_an_trip);

  /**
   * Get an trip
   * Put an trip
   * RequiredRoles: Manager
   * @section trip
   * @type get put
   * @url /v2/trips/:ticker
  */
  app.route('/v2/trips/:ticker')
    .get(authController.verifyUser(['MANAGER']),
      trip.list_a_trip)
    .put(authController.verifyUser(['MANAGER']),
      trip.update_an_trip);

  /**
    * Delete an trip
    * RequiredRoles: Manager
    * @section trips
    * @type delete
    * @url /v2/trips/:_id
   */
  app.route('/v2/trips/:_id')
    .delete(authController.verifyUser(['MANAGER']),
      trip.delete_an_trip_witout_app);

  /**
   * Put an trip
   * RequiredRoles: Manager
   * @section trip
   * @type put 
   * @url /v2/trips/:ticker/status
  */
  app.route('/v2/trips/:ticker/status')
    .put(authController.verifyUser(['MANAGER']),
      trip.change_status_trip);

  /**
   * get an trip
   * RequiredRoles: Manager
   * @section trip
   * @type get 
   * @url /v2/trips/:_id/applications
  */
  app.route('v2/trips/:_id/applications')
    .get(authController.verifyUser(['MANAGER']),
      trip.search_list_all_applications_trip);

  /**
   * put an trip
   * RequiredRoles: Manager
   * @section trip
   * @type put 
   * @url /v2/trips/:_id/applications/:_id/status
  */
  app.route('v2/trips/:_id/applications/:_id/status')
    .put(authController.verifyUser(['MANAGER']),
      trip.change_status_trip_applications);

  /**
   * put an trip
   * RequiredRoles: None
   * @section trip
   * @type put 
   * @url /v1/trips/:_id/applications/:_id/pay
  */
  app.route('/v1/trips/:_id/applications/:_id/pay')
    .put(trip.pay_application);

} 
