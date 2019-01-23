'use strict';

var https = require('https');

module.exports.hello = (event, context, callback) => {

https.get({
    host: 'api.ipify.org',
}, function(response) {
    var ip = '';
    response.on('data', function(d) {
        ip += d;
    });
    response.on('end', function() {
        if(ip){
            callback(null, ip);
        } else {
            callback('could not get public ip address :(');
        }
    });
});

};


