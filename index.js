var mongoose = require('mongoose');
var data = require('./data.js').data;
var wm = require('./watermarking.js');
mongoose.connect('mongodb://127.0.0.1/watermarking');

var userSchema = new mongoose.Schema({ name: String, phone: Number, dob: Date });

userSchema.pre('save', function(next) {
  var start = Date.now();
  var watermark = wm.watermark(this, 'name');
  this.setValue(watermark.key, watermark.value);
  console.log("    " + Date.now() - start + " ms in watermarking");
  next();
});

var User = mongoose.model('User', userSchema);

wm.config.watermark = "divjotsing";

/* TEST BENCH */
User.remove({}, function(err) {
  console.log("REMOVING");
  if(err) { console.log(err); return; }
  console.log("  INSERTING");
  User.create(data, function (err, d) {
    console.log("  INSERTED");
    if(err) { console.log(err); return; }
    console.log("  UPDATING");
    User.update({ phone : { $mod : [2, 0] } }, { $set : { dob : new Date() }}, function(err, data) {
      console.log("  UPDATED");
      if(err) { console.log(err); return; }
      console.log("DONE");
      process.exit(0);
    });
  });
});

/*
   Copyright (c) 2015 Divjot Singh

   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */

