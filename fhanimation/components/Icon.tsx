import React, {useEffect, useState} from 'react';
import {
  Animated,
  ColorValue,
  Dimensions,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const {height} = Dimensions.get('window');

const animationEndY = Math.ceil(height * 0.8);
const negativeEndY = animationEndY * -1;

const FloatingIconContainer = (props: {
  style: StyleProp<ViewStyle>;
  onComplete: Function;
  iconName: string;
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
        styles.FloatingIconContainer,
        {opacity: opacityAnimation, transform: [{translateY: state.position}]},
        props.style,
      ]}>
      <FloatingIcon
        iconName={props.iconName}
        color="red"
        style={styles.floatingIcon}
      />
    </Animated.View>
  );
};

const FloatingIcon = (props: {
  style: StyleProp<ViewStyle>;
  color: ColorValue | number | undefined;
  iconName: string;
}) => {
  return (
    <View style={[props.style]}>
      <FontAwesomeIcon color={props.color} size={25} name={props.iconName} />
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
  floatingIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FloatingIconContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'transparent',
  },
});

export default FloatingIconContainer;
