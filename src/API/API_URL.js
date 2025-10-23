import { API_BASE_URL } from '@env';

export const API_URL = `http://${API_BASE_URL}:8000/auth`;
export const API_URL_SUGGEST = `http://${API_BASE_URL}:8000/suggest`;

console.log("API_URL usado is this one:", API_URL);
console.log("API_URL_SUGGEST usado is this one:", API_URL_SUGGEST);