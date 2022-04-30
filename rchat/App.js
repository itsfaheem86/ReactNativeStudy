import {firebase} from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {GiftedChat, LoadEarlier} from 'react-native-gifted-chat';

const ChatRoom = ({navigation, route}) => {
  const {room, me} = route.params;
  const db = firebase.firestore();
  const chatsRef = db.collection('chats').doc(room.users.sort().join('#'));
  const messagesRef = chatsRef.collection('messages');

  const sender = Math.random() > 0.5 ? true : false;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = chatsRef.onSnapshot(documentSnapshot => {
      if (documentSnapshot.data()) {
        setMessages(
          documentSnapshot
            .data()
            ?.messages?.reverse()
            ?.map(message => {
              return {
                ...message,
                createdAt: message.createdAt.toDate(),
              };
            }) || [],
        );
      } else if (!documentSnapshot.data()) {
        chatsRef.set({users: room.users});
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={async messages => {
          const writes = messages.map(m => {
            messagesRef.add({
              ...m,
              user: {
                _id: sender ? room.users[0] : room.users[1],
                avatar: 'https://placeimg.com/140/140/any',
                name: 'udev',
              },
            });
          });
          await Promise.all(writes);
        }}
        user={{
          _id: me,
        }}
        loadEarlier={false}
        isLoadingEarlier={false}
        onLoadEarlier={() => {
          console.log({msg: 'load.more'});
        }}
        renderLoadEarlier={props => {
          return <LoadEarlier {...props} label="Load Previous Messages" />;
        }}
        inverted={Platform.OS !== 'web'}
        // scrollToBottom={true}
        infiniteScroll
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
          return {...doc.data(), roomId: doc.id};
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
                me: ME,
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
