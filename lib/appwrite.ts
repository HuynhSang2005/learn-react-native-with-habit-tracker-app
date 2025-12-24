import { Account, Client } from 'react-native-appwrite';

/**
 * Khởi tạo Appwrite client với cấu hình từ biến môi trường
 */
const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // Appwrite API Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!) // Project ID
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!); // Bundle ID/Package name từ .env

/**
 * Account service để quản lý authentication
 */
export const account = new Account(client);

/**
 * Export client để có thể sử dụng cho các service khác
 */
export default client;

