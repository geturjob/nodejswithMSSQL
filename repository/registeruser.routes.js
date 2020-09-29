var register = require('./registeruser');

function getRoutes(router) {
    router.route('/siteuser/getAllSiteUsers').get(register.getAllSiteUsers);

    router.route('/siteuser/getSiteUserBySiteUserID/:siteUserId').get(register.getSiteUserBySiteUserID);

    router.route('/siteuser/getAllActiveSiteUsers').get(register.getAllActiveSiteUsers);

    router.route('/siteuser/SaveSiteUserDetails').get(register.SaveSiteUserDetails);

}
module.exports = {
    getRoutes
}

