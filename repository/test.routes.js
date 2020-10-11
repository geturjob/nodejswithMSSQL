var test = require('./test');

function getRoutes(router){
    router.route('/test/getdata').get(test.getdata);
}

module.exports = {
    getRoutes
}