var dbcontext = require('../database/dbcontext');
var jwt = require('jsonwebtoken');
const mailgun = require("mailgun-js");

const DOMAIN = 'sandboxac8de4f8e1cd4f658c4752e76b3977b2.mailgun.org';
const api_key = '7ffe8a3f1138a7c0a2909c8e000d3347-0d2e38f7-387f497e';


function register(req, res) {
    var params = [];
    var email = req.body.email;
    params.push({ name: 'username', value: req.body.username });
    params.push({ name: 'email', value: req.body.email });
    params.push({ name: 'password', value: req.body.passwordGroup.password });
    params.push({ name: 'isActive', value: false })
    dbcontext.spWithParams('[dbo].[SaveSiteUserDetails]', params, function (err, data) {
        if (err) {
            res.sendstatus(500);
        }
        else {
            var user = data.recordset;
            var token = jwt.sign({ user: req.body.email, userId: user[0].SiteUserID }, 'somnath', { expiresIn: '5m' });
            const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
            const databody = {
                from: 'noreply@mail.com',
                to: email,
                subject: 'Hello',
                text: `<h2>Click on the below link to activate your account</h2>
            <a>http://localhost:4200/signup?token=${token}</a>
            `
            };
            mg.messages().send(databody, function (error, body) {
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    res.json('Success');
                }
            });
        }
    });
}

function activateUser(req, res) {
    var params = [];
    var token = req.body.token;

    jwt.verify(token, 'somnath', function (err, decoded) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            params.push({ name: 'email', value: decoded.user });
            params.push({ name: 'siteuserid', value: decoded.userId })
            params.push({ name: 'isActive', value: true });
            dbcontext.spWithParams('[dbo].[UpdateSaveSiteUserDetails]', params, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    res.json('Success');
                }
            })
        }
    });
}

function login(req, res) {
    var params = [];
    params.push({ name: 'username', value: req.body.username });
    params.push({ name: 'password', value: req.body.password });

    dbcontext.spWithParams('[dbo].[LoginUser]', params, function (err, data) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            var user = data.recordset;
            if (user != null) {
                var token = jwt.sign({ user: user[0].SiteUserID }, 'somnath');
                res.json({
                    user: user[0].SiteUserID,
                    token: token
                });
            }
            else {
                res.json('NoAccount');
            }
        }
    });
}

function verifyUserAndSendOTP(req, res) {
    var params = [];
    params.push({ name: 'username', value: req.body.username });
    params.push({ name: 'isVerify', value: true });

    dbcontext.spWithParams('[dbo].[VerifyAndChangePassword]', params, function (err, data) {
        if (err) {
            res.sendStatus(400);
        }
        else {
            var otp = Math.floor(Math.random() * 90000) + 10000;
            params.splice(1,1);
            params.push({ name: 'isSet', value: true });
            params.push({ name: 'otp', value: otp });
            dbcontext.spWithParams('[dbo].[GetSetSiteUserOTP]', params, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
                    const databody = {
                        from: 'noreply@mail.com',
                        to: req.body.username,
                        subject: 'Hello',
                        text: `<h2>Click on the below link to activate your account</h2>
                                <p>Your otp is ${otp}</p>
                            `
                    };
                    mg.messages().send(databody, function (error, body) { 
                        if(err)
                        {
                            res.sendStatus(400);
                        }else{
                            res.json('Success');
                        }
                    })
                }
            })
        }
    })
}

function verifyOTP(req, res) {
    var params = [];
    params.push({ name: 'username', value: req.body.username });
    params.push({ name: 'isSet', value: false });
    params.push({ name: 'otp', value: req.body.code });

    dbcontext.spWithParams('[dbo].[GetSetSiteUserOTP]', params, function (err, data) {
        if (err) {
            res.sendStatus(400);
        }
        else {
            if (data.recordset.length > 0) {
                res.json('Success');
            }
            else {
                res.sendStatus(500);
            }
        }
    });
}

function changePassword(req, res) {
    var params = [];
    params.push({ name: 'username', value: req.body.username });
    params.push({ name: 'isVerify', value: false })
    params.push({ name: 'password', value: req.body.passwordGroup.password });
    params.push({ name: 'otp', value: req.body.code });
    
    dbcontext.spWithParams('[dbo].[VerifyAndChangePassword]', params, function (err, data) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            if (data.recordset.length > 0) {
                res.json('success');
            }
            else {
                res.sendStatus(500);
            }
        }
    })
}

module.exports = {
    login,
    register,
    activateUser,
    verifyOTP,
    verifyUserAndSendOTP,
    changePassword
};