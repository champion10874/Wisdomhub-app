import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
export declare function uploadToCloudinary(file: string, public_id?: string, overwrite?: boolean, invalidate?: boolean, resourceType?: 'auto' | 'video'): Promise<UploadApiResponse | UploadApiErrorResponse | undefined>;
