import { ConfigContext, ExpoConfig } from 'expo/config';

/**
 * Expo Dynamic Configuration
 * 
 * @file app.config.ts
 * @description
 * File này hoạt động cùng với app.json theo kiến trúc hybrid configuration:
 * - app.json: Chứa static base configuration (dễ đọc, dễ maintain, hỗ trợ auto-mutation của CLI)
 * - app.config.ts: Override các giá trị cần dynamic (environment variables, conditional logic)
 * 
 * @rationale
 * **Tại sao giữ cả 2 files:**
 * 1. app.json làm base config → Dễ rollback, dễ cho CLI tools tự động update
 * 2. app.config.ts override dynamic values → Sử dụng process.env để đọc .env file
 * 3. Expo resolution: Khi có cả 2 files, app.config.ts có priority và nhận `config` object từ app.json
 * 4. Type safety: TypeScript provides autocomplete và error checking
 * 
 * @priority
 * Expo đọc theo thứ tự: app.config.ts (nếu có) > app.config.js (nếu có) > app.json
 * 
 * @env_variables
 * - EXPO_PUBLIC_APPWRITE_PLATFORM: Bundle identifier/package name cho iOS/Android
 *   → Cho phép sử dụng different bundle IDs cho dev/staging/production environments
 * 
 * @see https://docs.expo.dev/workflow/configuration/
 */
export default ({ config }: ConfigContext): ExpoConfig => ({
  // Kế thừa toàn bộ config từ app.json
  ...config,
  
  // Required fields với fallback từ app.json
  name: config.name!,
  slug: config.slug!,
  
  /**
   * iOS Configuration
   * Override bundleIdentifier từ environment variable
   * 
   * @reason Cho phép deploy multiple environments (dev/staging/prod) với different bundle IDs
   * @example EXPO_PUBLIC_APPWRITE_PLATFORM=co.pedrotrech.habittracker.dev
   */
  ios: {
    ...config.ios,
    bundleIdentifier: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM || config.ios?.bundleIdentifier || 'co.pedrotrech.habittracker',
  },
  
  /**
   * Android Configuration  
   * Override package name từ environment variable
   * 
   * @reason Giống iOS, cho phép multiple app variants trên cùng 1 device
   * @example EXPO_PUBLIC_APPWRITE_PLATFORM=co.pedrotrech.habittracker.staging
   */
  android: {
    ...config.android,
    package: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM || config.android?.package || 'co.pedrotrech.habittracker',
  },
});
