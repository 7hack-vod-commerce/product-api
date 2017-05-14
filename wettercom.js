const http = require('http');
const querystring = require('querystring');
const crypto = require('crypto');

module.exports = class WetterComApi {

    constructor(username, password) {
        this.host = 'rwds2.wetter.com';
        this.baseUrl = 'http://' + this.host;
        this.username = username;
        this.password = password;
    }

    apiPath(endpoint, parameters) {
        const query = querystring.stringify(parameters);
        const append = query ? '?' + query : '';
        return endpoint + append;
    }

    checksum(query) {
        const hash = this.username + this.password + query;
        return crypto.createHash('md5').update(hash).digest("hex");
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

    // GET: /locationByName/:name
    locationByName(query, callback) {
        const cs = this.checksum(query);
        const path = this.apiPath('/location/name/search/' + encodeURIComponent(query) + '/user/' + this.username + '/cs/' + cs);
        this.get(path, callback);
    }

    //GET: /forecast/:city_code
    forecast(city_code, callback) {
        const cs = this.checksum(city_code);
        const path = this.apiPath('/forecast/current/city/' + encodeURIComponent(city_code) + '/user/' + this.username + '/cs/' + cs + '/language/en');
        this.get(path, callback);
    }

    getImage(condition) {
        return 'https://cs1.wettercomassets.com/wcomv5/images/icons/small/d_' + condition + '_S.png';
    }

    map(f) {
        return {
            temp: f.city.forecast.t2,
            img: this.getImage(f.city.forecast.w)
        };
    }
}
