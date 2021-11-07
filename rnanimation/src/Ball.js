import React, {useEffect} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

const Ball = () => {
  let position = new Animated.ValueXY(0, 0);
  useEffect(() => {
    Animated.spring(position, {
      toValue: {x: 200, y: 500},
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View style={[position?.getLayout()]}>
      <View style={styles.ball}></View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black',
    margin: 20,
  },
});

export default Ball;
