"use strict";

var multer = require('multer');
var uuid = require('uuid');
var path = require('path');
var storage = multer.diskStorage({
  destination: 'uploads',
  filename: function filename(req, file, cb) {
    cb(null, uuid.v4() + path.extname(file.originalname));
  }
});

//export default multer({storage});
var upload = multer({
  storage: storage
});
module.exports = upload;