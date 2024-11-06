const os = require('os');
const path = require('path');

console.log(os.type())
console.log(os.version())
console.log(os.freemem())
console.log(os.cpus())

console.log(path.dirname(__filename));
console.log(path.basename(__filename))

console.log(path.parse(__filename));

