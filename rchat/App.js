import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

const App = () => {
  useEffect(() => {
    // collection -> doc -> collection :'(
    const unsubscribe = firestore()
      .collection('chats')
      // .doc('iIb7cKib6nyBSFBIW6w7')
      .onSnapshot(documentSnapshot => {
        // console.log({documentSnapshot: documentSnapshot.docs()});
        documentSnapshot.docChanges().forEach(({doc}) => {
          console.log({data: doc.id});
          console.log({data: doc.data()});
        });
      });

    // Stop listening for updates when no longer required
    return () => unsubscribe();
  }, []);
  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={[
          {
            _id: 1,
            text: 'udev',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ]}
        onSend={messages => {
          console.log({messages});
        }}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default App;
