import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={style.view}>
      <Text>bla bla bla</Text>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButton: {
    width: 100,
    height: 20,
    backgroundColor: "lightblue",
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 20,
  },
});
