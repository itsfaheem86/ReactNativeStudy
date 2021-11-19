import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FloatingIconContainer from './components/Icon';

let heartCount = 0;

class App extends React.Component {
  state: {hearts: {id: number; right: number}[] | null} = {
    hearts: null,
  };

  getRandomNumber = (max: number, min: number) => {
    return Math.random() * (max - min) + min;
  };

  addHeart = () => {
    heartCount++;
    this.setState({
      ...this.state,
      hearts:
        this.state.hearts != null
          ? [
              ...this.state.hearts,
              {
                id: heartCount,
                right: this.getRandomNumber(0, Dimensions.get('window').width),
              },
            ]
          : [
              {
                id: heartCount,
                right: this.getRandomNumber(0, Dimensions.get('window').width),
              },
            ],
    });
  };

  removeHeart = (id: number) => {
    this.setState({
      ...this.state,
      hearts:
        this.state.hearts != null
          ? this.state.hearts.filter(heart => {
              return heart.id !== id;
            })
          : this.state.hearts,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.hearts?.map(heart => {
          return (
            <FloatingIconContainer
              iconName="heart"
              key={heart.id}
              style={{right: heart.right}}
              onComplete={() => {
                this.removeHeart(heart.id);
              }}
            />
          );
        })}

        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={this.addHeart}
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});

export default App;
