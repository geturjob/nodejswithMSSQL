var loginuser = require('./login');


function getRoutes(router){
    router.route('/login/loginuser').post(loginuser.login);

    router.route('/login/register').post(loginuser.register);

    router.route('/login/activateaccount').post(loginuser.activateUser);

    router.route('/login/verifyuser').post(loginuser.verifyUserAndSendOTP);

    router.route('/login/verifycode').post(loginuser.verifyOTP);

    router.route('/login/changepassword').post(loginuser.changePassword);
}

module.exports = {
    getRoutes
}