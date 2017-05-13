var express = require('express');
var bodyParser = require('body-parser');
var requestHandler = require('./requestHandler');

var app = express();
const port = process.env.PORT || 3000;

var jsonParser = bodyParser.json();
app.use(bodyParser({limit: '50mb'}));

app.post('/products', jsonParser, requestHandler);

app.listen(port, () => {
    console.log('Hello console.' + port);
});