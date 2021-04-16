import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function SearchBar({ term, onTermChange, onTermSubmit }) {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        value={term}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onTermChange}
        style={styles.inptuStyle}
        placeholder="Search"
        onEndEditing={onTermSubmit}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    borderColor: "#A9A9A9",
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 20,
  },
  inptuStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});
