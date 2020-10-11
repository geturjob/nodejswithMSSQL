var jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    if(req.headers['token'])
    {
        var token = req.headers['token'];
        jwt.verify(token, 'somnath', function(err, decoded) {
            if(err)
            {
                res.sendStatus(403);
            }
            else{
                next();
            }
         });
    }
    else{
        res.sendStatus(403);
    }
}

module.exports = {
    verifyToken
}