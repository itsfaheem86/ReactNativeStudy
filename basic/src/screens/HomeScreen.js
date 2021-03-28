import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        onPress={(e) => {
          navigation.navigate("Components");
        }}
        title="Go to components"
      ></Button>
      <TouchableOpacity
        style={styles.button}
        onPress={(e) => {
          navigation.navigate("ListScreen");
        }}
      >
        <Text>Go to list screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={(e) => {
          navigation.navigate("ImageScreen");
        }}
      >
        <Text>Go to image screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  button: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "pink",
    marginTop: 20,
  },
});

export default HomeScreen;
