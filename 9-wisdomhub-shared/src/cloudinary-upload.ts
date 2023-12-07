import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

export function uploadToCloudinary(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean,
  resourceType: 'auto' | 'video' = 'auto'
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    const uploadOptions = {
      public_id,
      overwrite,
      invalidate,
      resource_type: resourceType,
      ...(resourceType === 'video' && {chunk_size: 50000})
    };

    cloudinary.v2.uploader.upload(
      file,
      uploadOptions,
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}
