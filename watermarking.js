exports.config = {};

function hash(value) { return require('crypto').createHash('md5').update(value).digest('hex'); }

exports.encode = function(object) {
  var secret = hash(exports.config.watermark + object._id);
  var secretStart = (parseInt(secret, 16) % exports.config.attributeNames.length);
  return { 
    key: exports.config.attributeNames[secretStart],
    value: parseInt(secret.substr(secretStart, 4), 16)
  };
};
exports.decode = function(object) {
  var secret = hash(exports.config.watermark + object._id);
  var secretStart = (parseInt(secret, 16) % exports.config.attributeNames.length);
  var propertyName = exports.config.attributeNames[secretStart];
  return (object.hasOwnProperty(propertyName) !== 'undefined' && object[propertyName] === parseInt(secret.substr(secretStart, 4), 16));
};
