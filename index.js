var express = require('express');
var bodyParser = require('body-parser');
var requestHandler = require('./requestHandler');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());

app.get('/wetter', (req, res) => {
    const wettercomClient = require('./wettercom');
    var wetter = new wettercomClient('7hack', 'hacktheweather');

    wetter.locationByName(req.query.name, cities => {
            wetter.forecast(cities.search.result[0].city_code, f => {
                res.json(wetter.map(f));
            });
        });
});

app.post('/products', requestHandler);
app.post('/productsMock', requestHandler);

app.listen(port, () => {
    console.log('Hello console.' + port);
});