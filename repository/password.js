var dbcontext = require('../database/dbcontext');

function GetPasswordList(req, res){
    var params=[];
    var siteUserId = req.headers['siteuserid'];
    params.push({name :'siteuserid', value:siteUserId});

    dbcontext.spWithParams('[dbo].[GetUserPasswordDetails]', params, function(err, data){
        if(err)
        {
            res.sendStatus(500);
        }
        else{
            res.json(data.recordset);
        }
    })
}

function SavePassword(req, res){
    var params = [];
    var siteuserid = req.headers['siteuserid'];
    params.push({name:'siteuserid', value:siteuserid})
    params.push({name:'category', value:req.body.category});
    params.push({name:'password', value:req.body.password});

    dbcontext.spWithParams('[dbo].[SaveUserPasswordDetails]', params, function(err, data){
        if(err)
        {
            res.sendStatus(500);
        }
        else{
            res.json(data.recordset);
        }
    })
}

module.exports = {
    GetPasswordList,
    SavePassword
}