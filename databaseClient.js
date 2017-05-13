const db = require('./data');

module.exports = (assetId, vendor, keyframe) => {
    return db.data.filter(d => d.assetId === assetId && d.vendor === vendor 
        && d.start <= keyframe && d.end >= keyframe).map(d => d.product);
}