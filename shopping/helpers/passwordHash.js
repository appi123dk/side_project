var crypto = require('crypto');
var mysalt = "1d2F4#";

module.exports = (password) => {
    return crypto.createHash('sha512').update( password + mysalt ).digest('base64');
}