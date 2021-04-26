import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Context } from "../context/BlogContext";

const IndexScreen = (props) => {
  const { state, addBlogPost } = useContext(Context);
  useEffect(() => {
    addBlogPost();
  }, []);
  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
      />
      <TouchableOpacity
        onPress={() => {
          addBlogPost();
        }}
        style={{ backgroundColor: "blue", alignItems: "center", padding: 5 }}
      >
        <Text style={{ color: "white" }}>Add a Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default IndexScreen;
