var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

app.post('/products', (req, res) => {
    res.send('Hello.');
});

app.listen(port, () => {
    console.log('Hello console.' + port);
});