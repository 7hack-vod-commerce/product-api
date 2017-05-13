var AWS = require('aws-sdk');
AWS.config.accessKeyId = 'AKIAJFUX6EQHJQRZD5RQ';
AWS.config.secretAccessKey = '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';
AWS.config.region = 'eu-central-1';

// create the AWS.Request object
const s3 = new AWS.S3();
const bucket = new AWS.S3({ params: { Bucket: '7hack' } });
const baseURL = 'https://s3.eu-central-1.amazonaws.com/7hack/';

module.exports = (base64Image) => {
    console.log('Received image post request');

    if (!req.body) return res.sendStatus(400);
    var base64Image = req.body.base64Image;
    var url = '';

    buf = new Buffer(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    var metaData = {
        Key: '7hack-'+Date.now()+'.jpeg',
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };

    bucket.putObject(metaData, function(err, data) {
        if (err) {
            console.log(err);
            console.log('Error uploading data: ', data);
            res.status(400).send(err);
        } else {
            console.log(data);
            console.log('succesfully uploaded the image!');
            url = baseURL + metaData.Key
        }
    });
    return url;
};
