const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dha4qcefw",
    api_key: "896811355727922",
    api_secret: "3dS4vUazKc8QNwaQtAXnab8Z6d8"
  });

module.exports = cloudinary;