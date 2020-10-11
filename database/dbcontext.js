var connection = require("./dbconnection");
var sql = require('mssql');

function ExecuteStoredProcedureWithParams(sp, parameters, callback) {
    connection.connect(function (err) {
        if (err) {
            console.log(err);
        }

        const request = new sql.Request(connection);
        parameters.forEach(element => {
            request.input(element.name, element.value);
        });

        request.execute(sp, function (err, recordSet) {
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                callback(null, recordSet);
            }
        });
    })
}

function ExecuteStoredProcedureWithoutParams(sp, callback) {
    connection.connect(function (err) {
        if (err) {
            console.log(err);
        }

        const request = new sql.Request(connection);
        request.execute(sp, function (err, recordSet) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, recordSet);
            }
        });
    })
}

module.exports = {
    spWithParams: ExecuteStoredProcedureWithParams,
    spWithoutParams: ExecuteStoredProcedureWithoutParams
};