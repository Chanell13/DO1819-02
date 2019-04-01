'use strict';
module.exports = function(app) {
	var store = require('../controllers/storeController');

  // Data Storage routes

  /**
	 * Bad option: Put a large json with documents from a file into a collection of mongoDB
	 * @section store
	 * @type post
	 * @url /v1/store/insertMany
	 * @param {string} dbURL       //mandatory
     * @param {string} mongooseModel  //mandatory
	 * @param {string} sourceFile   //mandatory
	 * Sample: http://localhost:8080/v1/store/insertMany?dbURL=mongodb://localhost:27017/ACME-Explorer&mongooseModel=Actors&sourceFile=c:/temp/TestingInsertMany.json
  */
  app.route('/v1/store/insertMany')
 		.post(store.store_json_insertMany);

  /**
	 * Put a large json with documents from a file into a collection of mongoDB
	 * @section store
	 * @type post
	 * @url /v1/store/fs
	 * @param {string} dbURL       //mandatory
     * @param {string} collection  //mandatory
	 * @param {string} sourceFile   //mandatory
	 * @param {string} batchSize   //optional
	 * @param {string} parseString //optional
	 * Sample: http://localhost:8080/v1/store/fs?dbURL=mongodb://localhost:27017/ACME-Explorer&collection=actors&batchSize=100&parseString=*&sourceFile=c:\temp\TestingManyActors.json
  */
  app.route('/v1/store/fs')
		.post(store.store_json_fs);

  /**
	 * Put a large json with documents from an URL into a collection of mongoDB
	 * @section store
	 * @type post
	 * @url /v1/store/url
	 * @param {string} dbURL       //mandatory
     * @param {string} collection  //mandatory
	 * @param {string} sourceURL   //mandatory
	 * @param {string} batchSize   //optional
	 * @param {string} parseString //optional
	 * Sample: http://localhost:8080/v1/store/url?dbURL=mongodb://localhost:27017/ACME-Explorer&collection=actors&batchSize=100&parseString=*&sourceURL=https://drive.google.com/uc?export=download%26id=1wOcO1yIk8u3hlii5i8WIBoI15iuRpujx
  */
  app.route('/v1/store/url')
 		.post(store.store_json_url);
};