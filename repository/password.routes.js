var password = require('./password');
var verify = require('./verifytoken');

function getRoutes(router){
    router.route('/password/getpasswordlist').get(verify.verifyToken, password.GetPasswordList);
    router.route('/password/SavePassword').post(verify.verifyToken, password.SavePassword);
}

module.exports ={
    getRoutes
}