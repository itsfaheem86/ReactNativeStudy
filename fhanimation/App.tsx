import React, {useEffect, useState} from 'react';
import {
  Animated,
  ColorValue,
  Dimensions,
  Easing,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

let heartCount = 0;

const App = () => {
  const [state, setState] = useState<{
    hearts: {id: number; right: number}[] | null;
  }>({
    hearts: null,
  });

  const getRandomNumber = (max: number, min: number) => {
    return Math.random() * (max - min) + min;
  };

  const addHeart = () => {
    heartCount++;
    setState({
      ...state,
      hearts:
        state.hearts != null
          ? [...state.hearts, {id: heartCount, right: getRandomNumber(50, 100)}]
          : [{id: heartCount, right: getRandomNumber(0, 100)}],
    });
  };

  const removeHeart = (id: number) => {
    setState({
      ...state,
      hearts:
        state.hearts != null
          ? state.hearts.filter(heart => {
              return heart.id !== id;
            })
          : state.hearts,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {state.hearts?.map(heart => {
        return (
          <HeartContainer
            key={heart.id}
            style={{right: heart.right}}
            onComplete={() => {
              removeHeart(heart.id);
            }}
          />
        );
      })}

      <View>
        <TouchableOpacity
          onPress={addHeart}
          style={{
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'pink',
            borderRadius: 40,
            margin: 20,
          }}>
          <FontAwesomeIcon color="red" size={25} name="heart" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const {height} = Dimensions.get('window');

const animationEndY = Math.ceil(height * 0.8);
const negativeEndY = animationEndY * -1;

const HeartContainer = (props: {
  style: StyleProp<ViewStyle>;
  onComplete: Function;
}) => {
  const [state, setState] = useState<{
    position: Animated.Value;
  }>({
    position: new Animated.Value(0),
  });

  let animation;
  let opacityAnimation;
  useEffect(() => {
    Animated.timing(state.position, {
      duration: 2 * 1000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      props.onComplete();
    });
  }, []);

  animation = state.position.interpolate({
    inputRange: [negativeEndY, 0],
    outputRange: [animationEndY, 0],
  });
  opacityAnimation = animation.interpolate({
    inputRange: [0, animationEndY],
    outputRange: [1, 0],
  });

  return (
    <Animated.View
      style={[
        styles.heartContainer,
        {opacity: opacityAnimation, transform: [{translateY: state.position}]},
        props.style,
      ]}>
      <Heart color="red" style={styles.heart} />
    </Animated.View>
  );
};

const Heart = (props: {
  style: StyleProp<ViewStyle>;
  color: ColorValue | number | undefined;
}) => {
  return (
    <View style={[props.style]}>
      <FontAwesomeIcon color={props.color} size={25} name="heart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  heart: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'transparent',
  },
});

export default App;
