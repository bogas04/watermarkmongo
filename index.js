/*
   Server keeps track of current groupNumber, prevGroupHash, current offset, and current groupSignature.

   Encryption techniques - hill cipher

   For each new tuple 
   if offset > group.size 
   groupNumber++, offset = 0, prevGroupHash = hash(groupSignature), groupSignature = null

   Save encrypt (groupNumber, offset, substring(prevGroupHash, (offset  + 1)*prevGroupHash.length/group.size ) into a new attribute of name 
   potentialAttributes[hash(signature) % potentialAttributes.length] 
   Append its hash(signature) to groupSignature
   offset++ 
   Insert the tuple


   Potential problems - groupNumber grows linearly, which will result in longer watermark and may be nearly as big as the hash(signature) of the tuple, hence not really solving any purpose.

*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/watermarking');

var ownerSecret = 'helloworld';
var potentialAttributes = [ 'attr1', 'attr2', 'attr3', 'attr4', 'attr5', 'attr6', 'attr7', 'attr8', 'attr9' ];

function md5(value) {
  return require('crypto').createHash('md5').update(value).digest('hex');
}
function hash(str) {
  return md5(str); 
}
function substring(of, )

var userSchema = new mongoose.Schema({
  name : String,
  phone : Number,
  dob : Date
}, { strict : false }); // for injecting

var group = { 
  number : 0, // current group number
  size : 100, // size of a group
  offset : 0, // current item index in the group
  prevHash : "", // previous hash of group
  signature : "" // signature of group
};
userSchema.pre('save', function(next) { 
  console.log(group);

  if(group.offset > group.size) {
    group.number++;
    group.offset = 0;
    group.prevHash = hash(group.signature);
    group.signature = "";
  }

  this[ potentialAttributes[ parseInt(hash(signature), 16) % potentialAttributes.length ]] = encrypt(
        group.number + group.offset + 
        substring(
          group.prevHash, 
          (group.offset  + 1)*group.prevHash.length/group.size
          )
        );

  group.signature += hash(signatureOf(this));
  group.offset++;
  console.log(group);

  next();
});

userSchema.methods.verifyWatermark = function() {
  console.log(this);
};

var User = mongoose.model('User', userSchema);

console.log("BOOTSTRAPPING");
// Bootstrapping database with some initial values
User.remove({}, function(err) {
  if(err) { console.log(err); return; }
  console.log("  INSERTING");
  User.create([
      {name : "Divjot", phone : 9654987802, dob : new Date()},
      {name : "Smith", phone : 9654987807, dob : new Date()},
      {name : "John", phone : 9654987818, dob : new Date()},
      {name : "Jane", phone : 9654987819, dob : new Date()},
      {name : "Smith", phone : 9654987824, dob : new Date()},
      {name : "Mike", phone : 9654987816, dob : new Date()},
      {name : "Drake", phone : 9654987842, dob : new Date()},
      {name : "Lilly", phone : 9654987823, dob : new Date()},
      {name : "Paul", phone : 9654987834, dob : new Date()},
      {name : "Ravjot", phone : 9654987826, dob : new Date()},
  ], function (err, d) {
    console.log("  INSERTED");
    if(err) { console.log(err); return; }
    console.log(d);
    console.log("  UPDATING");
    User.update({ phone : { $mod : [2, 0] } }, { $set : { dob : new Date() }}, function(err, data) {
      console.log("  UPDATED");
      if(err) { console.log(err + "as"); return; }
      for(var i in data) {
        console.log(data[i]); 
      };
    });
  });
});
console.log("DONE");
/*
   Copyright (c) 2015 Divjot Singh

   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
