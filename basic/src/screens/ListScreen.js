import React from "react";
import { FlatList } from "react-native-gesture-handler";
const { Text, View } = require("react-native");

const ListScreen = () => {
  const friends = [
    { name: "Friend #1", age: 20 },
    { name: "Friend #2", age: 21 },
    { name: "Friend #3", age: 22 },
    { name: "Friend #4", age: 23 },
    { name: "Friend #5", age: 24 },
    { name: "Friend #6", age: 25 },
    { name: "Friend #7", age: 26 },
    { name: "Friend #8", age: 27 },
    { name: "Friend #9", age: 28 },
    { name: "Friend #10", age: 29 },
    { name: "Friend #11", age: 30 },
    { name: "Friend #12", age: 31 },
    { name: "Friend #13", age: 32 },
    { name: "Friend #14", age: 33 },
  ];
  // Method #1
  // const friends = [
  //   { name: "Friend #1", key: "1" },
  //   { name: "Friend #2", key: "2" },
  //   { name: "Friend #3", key: "3" },
  //   { name: "Friend #4", key: "4" },
  //   { name: "Friend #5", key: "5" },
  //   { name: "Friend #6", key: "6" },
  //   { name: "Friend #7", key: "7" },
  //   { name: "Friend #8", key: "8" },
  //   { name: "Friend #9", key: "9" },
  //   { name: "Friend #10", key: "10" },
  //   { name: "Friend #11", key: "11" },
  //   { name: "Friend #12", key: "12" },
  //   { name: "Friend #13", key: "13" },
  //   { name: "Friend #14", key: "14" },
  // ];
  return (
    <FlatList
      keyExtractor={(friend) => friend.name}
      data={friends}
      horizontal={false}
      // showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <Text key={index} style={{ padding: 20, textAlign: "left" }}>
          {item.name + ",   age: " + item.age}
        </Text>
      )}
    ></FlatList>
  );
};

export default ListScreen;
