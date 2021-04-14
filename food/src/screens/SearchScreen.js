import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";

export default function SearchScreen() {
  const [term, setTerm] = useState("");

  const triggerAPI = () => {
    console.log("hell yah");
  };

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={triggerAPI}
      ></SearchBar>
      <Text>In Construction!</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
