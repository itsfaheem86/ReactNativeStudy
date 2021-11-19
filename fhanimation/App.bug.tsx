import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import HeartContainer from './components/Icon';

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
          ? [
              ...state.hearts,
              {
                id: heartCount,
                right:
                  3 * getRandomNumber(0, Dimensions.get('window').width / 4),
              },
            ]
          : [
              {
                id: heartCount,
                right:
                  3 * getRandomNumber(0, Dimensions.get('window').width / 4),
              },
            ],
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});

export default App;
