var express = require('express');
var bodyParser = require('body-parser');
var requestHandler = require('./requestHandler');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());

app.post('/products', requestHandler);

app.listen(port, () => {
    console.log('Hello console.' + port);
});