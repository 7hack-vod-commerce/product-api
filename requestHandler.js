module.exports = function (req, res) {
    if (!req.body) return res.sendStatus(400);

    var data = {
        image: req.body.image,
        assetId: req.body.assetId,
        vendor: req.body.vendor,
        keyframe: req.body.keyframe
    };

    result = '';

    res.status(200).send(result);
};