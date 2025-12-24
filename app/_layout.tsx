import { Stack } from "expo-router";

/**
 * RootLayout
 *
 * @description
 * Root layout của app - mount navigator và chạy initial checks
 *
 * @note
 * - Root layout phải render một navigator hoặc Slot ngay trong lần render đầu tiên.
 *   Nếu gọi điều hướng (router.replace / push / linkTo...) trước khi root navigator mount
 *   sẽ gây ra lỗi: "Attempted to navigate before mounting the Root Layout component".
 * - Đã di chuyển logic RouteGuard (kiểm tra auth + loading) vào `app/(tab)/RouteGuard.tsx`.
 *   Việc này đảm bảo navigator được mount trước khi thực hiện redirect.
 * - Appwrite connection tests được chạy tự động khi app khởi động để verify setup
 */
export default function RootLayout() {
  /**
   * Test Appwrite connection khi app khởi động
   * 
   * @reason
   * - Verify rằng Appwrite SDK đã được cấu hình đúng
   * - Check environment variables
   * - Test server connectivity
   * - Đảm bảo Android/iOS platform đã được thêm trong Appwrite Console
   * 
   * @see lib/appwrite-test.ts để xem chi tiết các tests
   */
  // useEffect(() => {
  //   // Run tests in background, không block UI
  //   runAllTests().catch(console.error);
  // }, []);

  return (
    <Stack>
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
    </Stack>
  );
}
