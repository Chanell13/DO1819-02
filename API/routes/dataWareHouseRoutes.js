'use strict';
module.exports = function(app) {
  var dataWareHouse = require('../controllers/dataWareHouseCtrl');
  var authController = require('../controllers/authCtrl');

  	/**
	 * Get a list of all indicators or post a new computation period for rebuilding
	 * Post to rebuild the datawarehouse rebuildPeriod
	 * RequiredRoles: Administrator
	 * @section dataWareHouse
	 * @type get post
	 * @url v1/dataWareHouse
	 * @param [string] rebuildPeriod
	*/
	app.route('/v1/dataWareHouse')
	.get(dataWareHouse.list_all_indicators)
	.post(dataWareHouse.rebuildPeriod);

	/**
	 * Get a list of all indicators or post a new computation period for rebuilding
	 * Post to rebuild the datawarehouse rebuildPeriod
	 * RequiredRole: Administrator
	 * @section dataWareHouse
	 * @type get post
	 * @url v2/dataWareHouse
	 * @param [string] rebuildPeriod
	*/
	app.route('/v2/dataWareHouse')
	.get(authController.verifyUser(['ADMINISTRATOR']),
	dataWareHouse.list_all_indicators)
	.post(authController.verifyUser(['ADMINISTRATOR']),
	dataWareHouse.rebuildPeriod);

	/**
	 * Get a list of last computed indicator
	 * RequiredRoles: Administrator
	 * @section dataWareHouse
	 * @type get
	 * @url v1/dataWareHouse/latest
	*/
	app.route('/v1/dataWareHouse/latest')
	.get(dataWareHouse.last_indicator);

	/**
	 * Get a list of last computed indicator
	 * RequiredRole: Administrator
	 * @section dataWareHouse
	 * @type get
	 * @url v2/dataWareHouse/latest
	*/
	app.route('/v2/dataWareHouse/latest')
	.get(authController.verifyUser(['ADMINISTRATOR']),
	dataWareHouse.last_indicator);
};
