var connectionPool = require('./connectionPool');

/**
 * 函数柯里化，用于复合相同逻辑的SQL交互
 * @param SQLQuote string
 * @returns {Function}
 */
module.exports = function (SQLQuote) {
    "use strict";
    if (!SQLQuote)
        throw new Error('No SQLQuote!');
    return function () {
        var argumentsArray = Array.prototype.slice.call(arguments);
        var promise = new Promise(function (resolve, reject) {
            connectionPool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                    return;
                }
                function queryFunc(err, result) {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                    connection.release();
                }

                if (argumentsArray.length > 0)
                    connection.query(SQLQuote, argumentsArray, queryFunc);
                else
                    connection.query(SQLQuote, queryFunc);
            });
        });
        return promise;
    }
};