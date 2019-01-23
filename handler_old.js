'use strict';

module.exports.hello = (event, context, callback) => {

  var https = require('https');

// var callback = function(err, ip){
//     if(err){
//         return console.log(err);
//     }
//     console.log('Our public IP is', ip);
//     // do something here with the IP address
// };

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

  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'Test1',
  //     input: event,
  //   }),
  // };

  // callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};


