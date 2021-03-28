import React from "react";
import { Image, Text, View } from "react-native";

const Cart = ({ text, imageUri }) => {
  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "lightblue",
      }}
    >
      <Image
        source={{ uri: imageUri }}
        style={{ width: 40, height: 40, marginBottom: 15 }}
      ></Image>
      <Text style={{ textAlign: "center" }}>{text}</Text>
    </View>
  );
};

export default Cart;
