var express = require("express");
var dbcontext = require('../database/dbcontext');

function getAllSiteUsers(req, res) {
    dbcontext.spWithoutParams('SP_GetAllSiteUser', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(data);
        }
    });
}

function getSiteUserBySiteUserID(req, res) {
    var params = [];
    params.push({ name: 'siteUserId', value: req.params.siteUserId });
    dbcontext.spWithParams('sp_GetSiteUserByID', params, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(data);
        }

    });
}

function getAllActiveSiteUsers(req, res) {
    dbcontext.spWithoutParams('[dbo].[SaveSiteUserDetails]', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            var finalArray = [];
            data.recordset.forEach(element => {
                if (element.isActive == true) {
                    finalArray.push(element);
                }
            });
            return res.json(finalArray);
        }
    });
}

function SaveSiteUserDetails(req, res) {
    var params = [];
    params.push({ name: 'userName', value: req.params.userName });
    params.push({ name: 'emailId', value: req.params.emailId });
    params.push({ name: 'phoneNo', value: req.params.phoneNo });
    params.push({ name: 'password', value: req.params.password });
    dbcontext.spWithParams('sp_saveSiteUserDetails', params, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(data);
        }
    });
}

module.exports = {
    getAllSiteUsers,
    getSiteUserBySiteUserID,
    getAllActiveSiteUsers,
    SaveSiteUserDetails,
}