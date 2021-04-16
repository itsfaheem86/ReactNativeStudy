import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ResultDetail = (item) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.image_url }}></Image>
      <Text style={styles.name}>{item.name}</Text>
      <Text>
        {item.rating} Stars, {item.review_count} Reviews
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 5,
  },
  name: {
    fontWeight: "bold",
  },
});

export default ResultDetail;
