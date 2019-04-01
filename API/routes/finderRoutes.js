'use strict';
module.exports = function (app) {
  var finder = require('../controllers/finderCtrl'),
  authController = require('../controllers/authCtrl');

  /**   
   * Get list of finders
   * Post finder
   * RequiredRoles: Explorer
   * @section finder
   * @type get post
   * @url /v2/finders
  */
  app.route('/v2/finders')
    .get(authController.verifyUser(["EXPLORER"]),
    finder.list_all_finders)
    .post(authController.verifyUser(["EXPLORER"]),
    finder.create_a_finder);

  /**  
   * Get finder by finderId
   * Put finder
   * RequiredRoles: Explorer
   * @section finder
   * @type get put
   * @url /v2/finders/:finderId   
  */
  app.route('/v2/finders/:finderId')
    .get(authController.verifyUser(["EXPLORER"]),
    finder.read_a_finder)
    .put(authController.verifyUser(["EXPLORER"]),
    finder.update_a_finder);
};