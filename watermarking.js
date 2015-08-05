var gen = require('random-seed');

function hash(value) {
  return require('crypto').createHash('md5').update(value).digest('hex');
}
exports.config = {};
exports.watermark = function(object, signatureKey) {
  // STEP 1: Create hash of watermark || signature value
  var ownerSecret = hash(exports.config.watermark + object[signatureKey]);
  // STEP 1.5: Create pseudo random generator with above hash as the seed
  var rand = gen.create(ownerSecret);
  var attributeNames = [ 'attr1', 'attr2', 'attr3', 'attr4', 'attr5', 'attr6' ];
  // STEP 2: Find index to start from of the above hash
  var secretStart = rand(ownerSecret.length - 4);
  var watermark = { 
    // STEP 3: Assign the attribute key based on pseudo random generator
    key : attributeNames[rand(attributeNames.length)],
    // STEP 4: Assign it a value based on substring of the hash
    value : parseInt(ownerSecret.substring(secretStart, secretStart + 4), 16)
  };
  console.log(secretStart);
  return watermark;
};
