
'use strict';

/*
 * Todos Route
 * path: /todos
 */

let express = require('express');
let controller = require("../controllers/mockApiController");

let router = express.Router();

let config = require('../../config.json');

router.get('/apis', controller.findAllApis); 
router.get('/apis/:method', controller.findApiByMethod); 
router.get('/apis/:method/:endpoint', controller.findApiByMethod); 
router.post('/apis/', controller.save); 
router.delete('/apis/', controller.deleteAllApis); 
router.delete('/apis/:method', controller.deleteApiByMethod); 
router.delete('/apis/:method/:endpoint', controller.deleteByIndexAndMethod); 

module.exports = router;
