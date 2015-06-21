function hash(value) {
  return require('crypto').createHash('md5').update(value).digest('hex');
}
function signatureOf(object, signatureKeys) {
  var str = "";
  for(var i = 0; i < signatureKeys.length; i++) {
    str += "" + object[signatureKeys[i]];
  }
  return str;
}
var group = {
  currentNumber : 0,
  groupSize : 100,
  previousHash : "",
  signature : null,
  offset : 0,
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
  ]
};
exports.watermark = function(object, signatureKeys) {
  //console.log(group);
  if(group.offset > group.size) {
    group.currentNumber++;
    group.offset = 0;
    group.previousHash = "";
    group.signature = "";
  }
  group.offset++;
  //group.previousHash += hash(signatureOf(object, signatureKeys));
  //var hashLength = group.previousHash.length / group.size;
  var signature = signatureOf(object, signatureKeys);
  var watermark = {
    key : group.potentialAttributes[parseInt(hash(signature), 16) % group.potentialAttributes.length],
    value : group.currentNumber 
      + "" 
      + group.offset 
      //+ group.previousHash.substring((group.offset - 1) * hashLength, hashLength)
  };
  //console.log(group);
  return watermark;
};
exports.group = group;
