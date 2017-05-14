const http = require('http');
const request = require('request');
const baseUrl = 'http://52.233.178.131:5000';

module.exports = (imageUrl, callback) => {
    
    // callback([ 
    //     { category: 'tank top', detail: 'white' } ,
    //     { category: 'shirt', detail: 'white' } 
    //     ]);
    // return;
    
   request({
        url: baseUrl,
        method: "POST",
        json: true,
        body: {
            url: imageUrl
        }
    }, function (error, response, body){
        if (error) response.sendStatus(400);
        callback(body);
    });
}

