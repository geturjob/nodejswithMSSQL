var express = require('express');
var register = require('../repository/registeruser.routes');
var login = require('../repository/login.routes');
var password = require('../repository/password.routes');

function eRoutes() {
    const router = express.Router();
    register.getRoutes(router);
    login.getRoutes(router);
    password.getRoutes(router);
    return router;
}

module.exports = eRoutes;




