var express = require('express');
var app = express();

app.post('/products', (req, res) => {
    res.send('Hello.');
});

app.listen(3000, () => {
    console.log('Hello console.');
});