import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {View} from 'react-native';

const App = () => {
  useEffect(() => {
    // collection -> doc -> collection :'(
    const unsubscribe = firestore()
      .collection('chats')
      .doc('iIb7cKib6nyBSFBIW6w7')
      .onSnapshot(documentSnapshot => {
        console.log({documentSnapshot: documentSnapshot.data()});
      });

    // Stop listening for updates when no longer required
    return () => unsubscribe();
  }, []);
  return <View></View>;
};

export default App;
