const http = require('http');
const querystring = require('querystring');

module.exports = class WegDeApi {

    constructor(apiKey) {
        this.host = '7hack.comvel.net';
        this.baseUrl = 'http://' + this.host + '/weg.de/v1';
        this.apiKey = apiKey;
    }

    apiPath(endpoint, parameters) {
        parameters['apikey'] = this.apiKey;
        const query = querystring.stringify(parameters);
        return '/weg.de/v1' + endpoint + '?' + query;
    }

    // GET: /destinations
    destination(query, callback) {
        const options = {
            host: this.host,
            path: this.apiPath('/destinations', { query: query }),
            json: true
        };

        const req = http.get(options, function (res) {
            res.setEncoding('utf-8');

            var responseString = '';

            res.on('data', function (data) {
                responseString += data;
            });

            res.on('end', () => {
                var responseObject = JSON.parse(responseString);
                callback(responseObject);
            });
        });

    }

}
