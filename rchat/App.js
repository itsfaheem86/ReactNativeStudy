import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {View} from 'react-native';

const App = () => {
  useEffect(() => {
    const userDocument = firestore().collection('Users').doc('ABC');
  }, []);
  return <View></View>;
};

export default App;
