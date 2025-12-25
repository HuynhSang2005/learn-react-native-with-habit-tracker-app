// /**
//  * RouteGuard.tsx
//  *
//  * Mục đích:
//  * - Kiểm tra trạng thái xác thực (auth) cho các màn trong `(tab)` group.
//  * - Hiện loading UI trong khi chờ kết quả kiểm tra.
//  * - Nếu chưa xác thực => redirect về `/auth`.
//  *
//  * Ghi chú cho dev (tiếng Việt):
//  * - Hook `useAuth()` là template nằm ở `lib/useAuth.ts` và dùng `lib/appwrite.ts` để gọi Appwrite.
//  *   Bạn cần implement `getCurrentUser()` / `onAuthStateChanged()` trong `lib/appwrite.ts` để hook này hoạt động.
//  * - Để tránh lỗi: "Attempted to navigate before mounting the Root Layout component",
//  *   ta defer việc gọi `router.replace(...)` vào tick tiếp theo (setTimeout 0) — đây là biện pháp phòng ngừa.
//  * - Bạn có thể thay ActivityIndicator bằng skeleton/splash theo design của app.
//  */

// import React, { useEffect } from "react";
// import { View, ActivityIndicator, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";
// import { useAuth } from "../../lib/useAuth";

// type Props = {
//   children: React.ReactNode;
// };

// export default function RouteGuard({ children }: Props) {
//   const router = useRouter();
//   const { user, loading } = useAuth();

//   useEffect(() => {
//     // Khi đã biết kết quả (không còn loading) và không có user => redirect
//     if (!loading && !user) {
//       // Defer redirect để chắc chắn navigator đã sẵn sàng
//       const id = setTimeout(() => {
//         router.replace("/auth");
//       }, 0);
//       return () => clearTimeout(id);
//     }
//     // Nếu user tồn tại, không làm gì -> render children
//   }, [loading, user, router]);

//   // Hiện loading screen trong khi kiểm tra auth
//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   // Auth OK -> render children (Tabs)
//   return <>{children}</>;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
