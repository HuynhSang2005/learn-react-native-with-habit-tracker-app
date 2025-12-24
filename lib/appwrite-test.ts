import { account } from './appwrite';

/**
 * Test Appwrite Connection
 * 
 * @description
 * Script này kiểm tra kết nối với Appwrite backend và test các basic operations
 * 
 * @usage
 * Import và gọi các hàm test này từ app để verify setup
 */

/**
 * Test 1: Ping Appwrite server để kiểm tra kết nối cơ bản
 * 
 * @returns Promise<boolean> true nếu kết nối thành công
 */
export async function testAppwriteConnection(): Promise<boolean> {
  try {
    console.log('🔄 Testing Appwrite connection...');
    
    // Thử gọi account.get() - nếu server unreachable sẽ throw network error
    // Nếu 401/unauthorized thì server đang hoạt động tốt
    await account.get();
    
    console.log('Appwrite connection successful! (User is logged in)');
    return true;
  } catch (error: any) {
    // 401 = server OK, just not authenticated
    if (error?.code === 401 || error?.type === 'general_unauthorized_scope') {
      console.log('Appwrite server reachable (not logged in - this is OK)');
      return true;
    }
    
    // Network errors hoặc các lỗi khác
    console.error('Appwrite connection failed:', error);
    return false;
  }
}

/**
 * Test 2: Check Account service availability
 * Lưu ý: Sẽ trả về lỗi nếu chưa đăng nhập, nhưng đó là expected behavior
 * 
 * @returns Promise<boolean> true nếu service sẵn sàng (kể cả khi chưa auth)
 */
export async function testAccountService(): Promise<boolean> {
  try {
    console.log('Testing Account service...');
    
    // Thử get current session - sẽ fail nếu chưa login, nhưng prove service works
    const session = await account.get();
    
    console.log('Account service working! Current user:', session.name);
    return true;
  } catch (error: any) {
    // Error 401 (Unauthorized) nghĩa là service hoạt động, chỉ là chưa login
    if (error?.code === 401 || error?.type === 'general_unauthorized_scope') {
      console.log('Account service available (not logged in yet - this is OK)');
      return true;
    }
    
    console.error('Account service error:', error);
    return false;
  }
}

/**
 * Test 3: Verify environment variables
 * 
 * @returns object với status của các env vars
 */
export function testEnvironmentVariables() {
  console.log('🔄 Checking environment variables...');
  
  const checks = {
    endpoint: !!process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: !!process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: !!process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  };
  
  console.log('Environment Variables Status:');
  console.log('  - EXPO_PUBLIC_APPWRITE_ENDPOINT:', checks.endpoint ? 'yes' : 'no');
  console.log('  - EXPO_PUBLIC_APPWRITE_PROJECT_ID:', checks.projectId ? 'yes' : 'no');
  console.log('  - EXPO_PUBLIC_APPWRITE_PLATFORM:', checks.platform ? 'yes' : 'no');
  
  if (checks.endpoint && checks.projectId && checks.platform) {
    console.log('All environment variables are set!');
  } else {
    console.warn('Some environment variables are missing!');
  }
  
  return checks;
}

/**
 * Run all tests
 * 
 * @returns Promise<void>
 */
export async function runAllTests(): Promise<void> {
  console.log('\n========== APPWRITE SETUP TESTS ==========\n');
  
  // Test 1: Environment variables
  testEnvironmentVariables();
  
  console.log('\n');
  
  // Test 2: Connection
  await testAppwriteConnection();
  
  console.log('\n');
  
  // Test 3: Account service
  await testAccountService();
  
  console.log('\n========== TESTS COMPLETED ==========\n');
}
