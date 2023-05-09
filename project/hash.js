var crypto = require('crypto');
var data = "jsr@1234";
var hash = crypto.createHash('sha256');
var finhash = hash.update(data).digest('hex');
console.log(finhash);

