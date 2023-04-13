import { config } from 'dotenv';
config();

export const MONGODB_URL = process.env.MONGODB_URL;
export const MONGODB_ATLAS_URL = process.env.MONGODB_ATLAS_URL;
export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const EMAIL_TICKETS_USER = process.env.EMAIL_TICKETS_USER;
export const EMAIL_TICKETS_PASSWORD = process.env.EMAIL_TICKETS_PASSWORD;
export const ELEMENTX_LOCAL_HOME_PAGE = process.env.ELEMENTX_LOCAL_HOME_PAGE;
