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
import BlogContext from "../context/BlogContext";

const IndexScreen = (props) => {
  const { blogPosts, addBlogPost } = useContext(BlogContext);
  useEffect(() => {
    addBlogPost({ title: "From useEffect" });
  }, []);
  return (
    <View>
      <FlatList
        data={blogPosts}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
      />
      <TouchableOpacity
        onPress={() => {
          addBlogPost({ title: "From touchableOpacity" });
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
