import React from "react";
import { View } from "react-native";
import Cart from "../components/Cart";

const ImageScreen = () => {
  const cartsData = [
    {
      text: "1 should be shown to users",
      imageUri:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80",
    },
    {
      text: "2 should be shown to users",
      imageUri:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80",
    },
    {
      text: "3 should be shown to users",
      imageUri:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80",
    },
  ];

  return (
    <View>
      {cartsData.map((cartData, index) => (
        <Cart key={index} {...cartData}></Cart>
      ))}
    </View>
  );
};

export default ImageScreen;
