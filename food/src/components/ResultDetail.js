import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ResultDetail = ({ image_url, name, rating, review_count, style }) => {
  return (
    <View style={(styles.container, style)}>
      {image_url && (
        <Image style={styles.image} source={{ uri: image_url }}></Image>
      )}
      {name && <Text style={styles.name}>{name}</Text>}
      {rating && review_count && (
        <Text>
          {rating} Stars, {review_count} Reviews
        </Text>
      )}
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
