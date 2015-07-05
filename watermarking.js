var gen = require('random-seed');

function hash(value) {
  return require('crypto').createHash('md5').update(value).digest('hex');
}
exports.config = {};
exports.watermark = function(object, signatureKey) {
  var ownerSecret = exports.config.watermark + object[signatureKey]; 
  var rand = gen.create(ownerSecret);
  var attributeNames = [
    'attr1',
    'attr2',
    'attr3',
    'attr4',
    'attr5',
    'attr6'
  ];
  var secretStart = rand(ownerSecret.length - 4);
  var watermark = {
    key : attributeNames[rand(attributeNames.length)],
    value : ownerSecret.substring(secretStart, secretStart + 4)
  };
  console.log(secretStart);
  return watermark;
};
