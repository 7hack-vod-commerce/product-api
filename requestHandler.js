const imageUploaderClient = require('./imageUploaderClient');
const imageRecognitionClient = require('./imageRecognitionClient');
const databaseClient = require('./databaseClient');
const stylightClient = require('./stylight');

const async = require('async');

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
            var s = new stylightClient('H6490912AB3211E680F576304DEC7EB7');
            async.map(tags, (t, cb) => {
                const query = t.category + ' ' + t.detail;
                s.products(query, productResult => {
                    var products = productResult.products.map(p => {
                        return {
                            brand: p.brand.name,
                            name: p.name,
                            url: p.url,
                            imageUrl: p.images.filter(i => i.primary)[0].url,
                            category: t.category.charAt(0).toUpperCase() + t.category.slice(1)
                        };
                    });
                    cb(null, products[0]);
                });
            }, (err, result) => {
                console.log(err, result);
            });
        });
    });

    // products.brand.name
    // products.name
    // products.url
    // p.images.url  , primary=true
    // Category nicht in API


    res.sendStatus(200);
};