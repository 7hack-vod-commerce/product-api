const imageUploaderClient = require('./imageUploaderClient');
const imageRecognitionClient = require('./imageRecognitionClient');
const databaseClient = require('./databaseClient');

module.exports = (req, res) => {
    if (!req.body) return res.sendStatus(400);

    var data = {
        image: req.body.image,
        assetId: req.body.assetId,
        vendor: req.body.vendor,
        keyframe: req.body.keyframe
    };

    var products = databaseClient(data.assetId, data.vendor, data.keyframe);

    imageUploaderClient(data.image, url => {
        imageRecognitionClient(url, tags => {
        });
    });

    res.sendStatus(200);
};