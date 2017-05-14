const imageUploaderClient = require('./imageUploaderClient');
const imageRecognitionClient = require('./imageRecognitionClient');
const databaseClient = require('./databaseClient');
const stylightClient = require('./stylight');
const wettercomClient = require('./wettercom');

const async = require('async');

module.exports = (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);

        var data = {
            image: req.body.image,
            assetId: req.body.assetId,
            vendor: req.body.vendor,
            keyframe: req.body.keyframe
        };

        let products = databaseClient(data.assetId, data.vendor, data.keyframe);
        products = products.slice(0, 1).concat(products.slice(1).shuffle());

        var wetter = new wettercomClient('7hack', 'hacktheweather');

        for (let i = 0; i < products.length; i++) {
            if (products[i].category.toLowerCase() != 'location')
                continue;

            wetter.locationByName(products[i].detail, cities => {
                wetter.forecast(cities.search.result[0].city_code, f => {
                    products[i].weather = wetter.map(f);
                });
            });

            break;
        }

        // if (products.length >= 3) {
        //     res.status(200).send(products.slice(0,2));
        //     return;
        // }

        if (!req.url.toLowerCase().includes('mock')) {
            imageUploaderClient(data.image, url => {
                imageRecognitionClient(url, tags => {
                    if (tags.length == 0) {
                        tags = [
                            { category: 'tank top', detail: 'white' },
                            { category: 'shirt', detail: 'white' }
                        ]
                    }

                    var s = new stylightClient('H6490912AB3211E680F576304DEC7EB7');
                    async.map(tags.filter(t => t.category.toLowerCase() != 'location'), (t, cb) => {
                        const query = t.category + ' ' + t.detail;
                        s.products(query, productResult => {
                            console.log(productResult);
                            var products = productResult.products.map(p => {
                                return {
                                    brand: p.brand.name,
                                    detail: p.name,
                                    url: p.url,
                                    image: p.images.filter(i => i.primary)[0].url,
                                    category: t.category.charAt(0).toUpperCase() + t.category.slice(1),
                                    source: 'editorial'
                                };
                            });
                            cb(null, products[0]);
                        });
                    }, (err, result) => {
                        if (!!err) res.sendStatus(400);
                        let aiProds = result.slice(0, 2);
                        res.json(products.slice(0, 4 - aiProds.length).concat(aiProds));
                    });
                });
            });
        } else {
            setTimeout(() => {
                res.json(products.slice(0, 4));
            }, 2000);
        }
    }
    catch (e) {
        res.sendStatus(400);
        console.log(e);
    }
};