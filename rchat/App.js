import {firebase} from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatRoom = ({navigation, route}) => {
  const {room} = route.params;
  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={room.messages || []}
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
const Home = ({navigation}) => {
  const db = firebase.firestore();
  const chatsRef = db.collection('chats');
  const ME = 'randomUserOne';

  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const unsubscribe = chatsRef
      .where('users', 'array-contains', 'randomUserOne')
      .onSnapshot(documentSnapshot => {
        const mappedSnapshot = documentSnapshot.docs.map(doc => {
          return {...doc.data()};
        });
        setRooms(mappedSnapshot);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{flex: 1, padding: 16}}>
      {rooms.map((room, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('chat-room', {
                room,
              });
            }}
            style={{
              backgroundColor: 'gray',
              borderRadius: 7,
              padding: 15,
              marginBottom: 15,
            }}>
            <Text>
              {room?.users[0] == ME ? room?.users?.[1] : room?.users?.[0]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const App = () => {
  const RooStack = createStackNavigator();

  return (
    <NavigationContainer>
      <RooStack.Navigator initialRouteName="home">
        <RooStack.Screen name="home" component={Home} />
        <RooStack.Screen name="chat-room" component={ChatRoom} />
      </RooStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
