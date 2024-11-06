const url = require('url');

var address = 'http://localhost:8080/default.htm?year=2017&month=february';


var tmp = url.parse(address,true);

console.log(tmp.host)
console.log(tmp.auth)
console.log(tmp.hostname);
console.log(tmp.pathname);
console.log(tmp.port);