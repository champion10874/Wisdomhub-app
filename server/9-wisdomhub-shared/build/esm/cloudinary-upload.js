function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import cloudinary from 'cloudinary';
export function uploadToCloudinary(file, public_id, overwrite, invalidate, resourceType = 'auto') {
  return new Promise(resolve => {
    const uploadOptions = _extends({
      public_id,
      overwrite,
      invalidate,
      resource_type: resourceType
    }, resourceType === 'video' && {
      chunk_size: 50000
    });
    cloudinary.v2.uploader.upload(file, uploadOptions, (error, result) => {
      if (error) resolve(error);
      resolve(result);
    });
  });
}
//# sourceMappingURL=cloudinary-upload.js.map