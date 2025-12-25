import { View, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Text } from "react-native-paper";

export default function AuthScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
    >
      <View>
        <Text> Create Account </Text>

        <TextInput
          label=""
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
