exports.group = {
  currentNumber : 0,
  groupSize : 100,
  previousHash : null,
  signature : null,
  potentialAttributes: [
    'attr1',
    'attr2',
    'attr3',
    'attr4',
    'attr5',
    'attr6',
    'attr7',
    'attr8',
    'attr9',
    'attr10'
  ],
  hash : function(value) {
    return require('crypto').createHash('md5').update(value).digest('hex');
  }
};
exports.watermark = function(object) {
  return { key : "watermark", value : "helloWorld" };
}
