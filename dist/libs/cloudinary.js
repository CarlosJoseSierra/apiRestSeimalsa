"use strict";

var _cloudinary = require("cloudinary");
// Configuration
_cloudinary.v2.config({
  cloud_name: 'dpk07hb7y',
  api_key: '492144958969564',
  api_secret: 'iccUf1VTuG6tVCM9hl5ISxehQ_0' // Click 'View Credentials' below to copy your API secret
});

module.exports = _cloudinary.v2;