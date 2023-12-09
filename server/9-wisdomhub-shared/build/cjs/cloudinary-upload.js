"use strict";

exports.__esModule = true;
exports.uploadToCloudinary = uploadToCloudinary;
var _cloudinary = _interopRequireDefault(require("cloudinary"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function uploadToCloudinary(file, public_id, overwrite, invalidate, resourceType = 'auto') {
  return new Promise(resolve => {
    const uploadOptions = {
      public_id,
      overwrite,
      invalidate,
      resource_type: resourceType,
      ...(resourceType === 'video' && {
        chunk_size: 50000
      })
    };
    _cloudinary.default.v2.uploader.upload(file, uploadOptions, (error, result) => {
      if (error) resolve(error);
      resolve(result);
    });
  });
}
//# sourceMappingURL=cloudinary-upload.js.map