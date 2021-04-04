import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const CounterScreen = () => {
  const [counter, setCount] = useState(0);

  return (
    <View>
      <Text>Current count {counter}</Text>
      <Button
        title="Increase"
        onPress={() => {
          setCount(counter + 1);
        }}
      ></Button>
      <Button
        title="Descrease"
        onPress={() => {
          setCount(counter - 1);
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CounterScreen;
