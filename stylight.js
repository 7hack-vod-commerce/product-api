const http = require('http');
const querystring = require('querystring');

module.exports = class StylightApi {

    constructor(apiKey) {
        this.host = 'api-hack.stylight.net';
        this.baseUrl = 'http://' + this.host;
        this.apiKey = apiKey;
    }

    apiPath(endpoint, parameters) {
        parameters['apiKey'] = this.apiKey;
        const query = querystring.stringify(parameters);
        return endpoint + '?' + query;
    }


    get(path, callback) {
        const options = {
            host: this.host,
            path: path,
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

    // GET: /products
    products(query, callback) {
        this.get(this.apiPath('/products', { 
            search_string: query, 
            page_items: 3
        }), callback);
    }

    // /tags/filters
    filters(query, callback) {
        this.get(this.apiPath('/tags/filters', { search_string: query }), callback);
    }
}
