'use strict';
module.exports = function(app) {
  var actors = require('../controllers/actorsCtrl');

  /**
	 * Get custom auth token, for an actor by providing email and password
	 * @section login
	 * @type get
	 * @url /v1/login/
	 * @param {string} email
   * @param {string} password
	*/
  app.route('/v1/login/')//?email=xxxx&pass=zzzz
    .get(actors.login_an_actor);
};
