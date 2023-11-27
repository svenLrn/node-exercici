const crypto = require('crypto');
const randomBytes = crypto.randomBytes(16);
const randomId = randomBytes.toString('hex');

console.log(randomId);
