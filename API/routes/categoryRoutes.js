'use strict';
module.exports = function (app) {

  var category = require('../controllers/categoryCtrl');


  /**
     * Get an category
    
     * @section category
     * @type get / post
     * @url /v1/category
     * @param {string} sortedBy (category)
    */
  app.route('/v1/category')
    .get(category.list_all_category)
    .post(category.create_an_category);


  /**
   * Put an category
   * RequiredRoles: None
   * @section categories
   * @type put / delete
   * @url /v1/category/:_id
   */

  app.route('/v1/category/:_id')
    .put(category.update_status_category)
    .delete(category.delete_an_category_witout_trip);


  /**
 * Get an category
 
 * @section category
 * @type get special
 * @url /v1/category
 * @param {string} sortedBy (category)
*/
  app.route('/v1/category/search')
    .get(category.search_category);





} 
