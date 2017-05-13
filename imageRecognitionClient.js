const http = require('http');
const request = require('request');
const baseUrl = 'http://cb2c87bb.ngrok.io';

module.exports = (imageUrl, callback) => {

    request({
        url: baseUrl,
        method: "POST",
        json: true,
        body: {
            url: imageUrl
        }
    }, function (error, response, body){
        console.log(response);
        callback(response);
    });
}

