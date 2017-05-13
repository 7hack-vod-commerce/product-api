const imageUploaderClient = require('./imageUploaderClient');
const imageRecognitionClient = require('./imageRecognitionClient');

module.exports = (req, res) => {
    if (!req.body) return res.sendStatus(400);

    var data = {
        image: req.body.image,
        assetId: req.body.assetId,
        vendor: req.body.vendor,
        keyframe: req.body.keyframe
    };

// var imageUrl = imageUploaderClient(data.image, 
//     imageRecognitionClient (imageUrl, databaseClient()));

//    var mergedTags = mergedTags(databaseTags, imageRecognitionTags);
//    var result = performAPISearch(mergedTags);


    result = '';

    res.status(200).send(result);
};