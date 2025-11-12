import { API_BASE_URL } from '@env';

export const API_URL = `http://${API_BASE_URL}/api/auth`;
export const API_URL_SUGGEST = `http://${API_BASE_URL}/api/suggest`;

console.log("API_URL usado is this one:", API_URL);
console.log("API_URL_SUGGEST usado is this one:", API_URL_SUGGEST);