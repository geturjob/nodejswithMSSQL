var sql = require("mssql/msnodesqlv8");

var config = {
    server: 'LAPTOP-71T710CI\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    database: 'WebPortal',
    user: 'somnath',
    password: 'somnath123',
    port: 1433,
}

var connection = new sql.ConnectionPool(config);

connection.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    }
    else {
        console.log('connected');
    }
}
)

module.exports = connection;