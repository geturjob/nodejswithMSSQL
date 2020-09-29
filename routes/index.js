var express = require('express');
var register = require('../repository/registeruser.routes');

function eRoutes() {
    const router = express.Router();
    register.getRoutes(router);
    return router;
}

module.exports = eRoutes;




