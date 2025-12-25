import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
// import RouteGuard from "./RouteGuard";
export default function TabLayout() {
  return (
    // <RouteGuard>
      <Tabs screenOptions={{ tabBarActiveTintColor: "coral" }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <Ionicons name="home-outline" size={24} color="black" />
              ) : (
                <Ionicons name="home" size={24} color={color} />
              );
            },
          }}
        />
        <Tabs.Screen name="login" options={{ title: "Login" }} />
      </Tabs>
    // </RouteGuard>
  );
}
