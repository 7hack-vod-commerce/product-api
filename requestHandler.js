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

    // if (products.length >= 3) {
    //     res.status(200).send(products.slice(0,2));
    //     return;
    // }

    imageUploaderClient(data.image, url => {
        imageRecognitionClient(url, tags => {
            var s = new stylightClient('H6490912AB3211E680F576304DEC7EB7');
            async.map(tags, (t, cb) => {
                const query = t.category + ' ' + t.detail;
                s.products(query, productResult => {
                    var products = productResult.products.map(p => {
                        return {
                            brand: p.brand.name,
                            detail: p.name,
                            url: p.url,
                            image: p.images.filter(i => i.primary)[0].url,
                            category: t.category.charAt(0).toUpperCase() + t.category.slice(1)
                        };
                    });
                    cb(null, products[0]);
                });
            }, (err, result) => {
                if (!!err) res.sendStatus(400);
                let aiProds = result.slice(0,2);
                res.json(products.slice(0, 4 - aiProds.length).concat(aiProds));
            });
        });
    });

};