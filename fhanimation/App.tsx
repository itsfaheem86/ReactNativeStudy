import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({container: {flex: 1}});

export default App;
