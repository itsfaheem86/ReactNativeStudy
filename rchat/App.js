import {firebase} from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GiftedChat, LoadEarlier} from 'react-native-gifted-chat';

const ChatRoom = ({navigation, route}) => {
  const {room, me} = route.params;
  const db = firebase.firestore();
  const chatsRef = db.collection('chats').doc(room.users.sort().join('#'));
  const messagesRef = chatsRef.collection('messages');
  const sender = Math.random() > 0.5 ? true : false;
  const pageSize = 10;

  console.log({room});

  const [messages, setMessages] = useState([]);
  const [loadEarlierData, setLoadEarlierData] = useState({
    isLoadingEarlier: false,
    loadEarlier: true,
  });

  useEffect(() => {
    const unsubscribe = messagesRef
      .orderBy('createdAt', 'desc')
      // Limiting the page emitting unnecessary 'removed' state on new element
      .limit(pageSize)
      .onSnapshot(documentSnapshot => {
        let messageChanges = [];
        documentSnapshot.docChanges().forEach(docChange => {
          console.log({type: docChange.type, data: docChange.doc.data()});
          if (docChange.type == 'added') {
            messageChanges.push({
              ...docChange.doc.data(),
              createdAt: docChange.doc.data().createdAt.toDate(),
              sent: !!room?.['readData#randomUserOne']
                ? room['readData#randomUserOne'].date.toDate() >
                  docChange.doc.data().createdAt.toDate()
                : false,
              pending: !!room?.['readData#randomUserOne']
                ? room['readData#randomUserOne'].date.toDate() >
                  docChange.doc.data().createdAt.toDate()
                : false,
              received: !!room?.['readData#randomUserOne']
                ? room['readData#randomUserOne'].date.toDate() >
                  docChange.doc.data().createdAt.toDate()
                : false,
            });
          }
        });
        setMessages(previousState => [...messageChanges, ...previousState]);
      });
    return () => unsubscribe();
  }, []);

  console.log({messages});

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
        loadEarlier={loadEarlierData.loadEarlier}
        isLoadingEarlier={loadEarlierData.isLoadingEarlier}
        onLoadEarlier={() => {
          console.log({
            msg: 'loading more!',
          });
          setLoadEarlierData({...loadEarlierData, isLoadingEarlier: true});
          messagesRef
            .orderBy('createdAt', 'desc')
            // Last ordered property
            .startAfter(messages[messages.length - 1].createdAt)
            .limit(pageSize)
            .get()
            .then(documentSnapshot => {
              if (!documentSnapshot.docs.length) {
                setLoadEarlierData({
                  ...loadEarlierData,
                  isLoadingEarlier: false,
                  loadEarlier: false,
                });
              } else {
                setLoadEarlierData({
                  ...loadEarlierData,
                  isLoadingEarlier: false,
                  loadEarlier: true,
                });
                setMessages([
                  ...messages.concat(
                    documentSnapshot.docs.map(doc => {
                      return {
                        ...doc.data(),
                        createdAt: doc.data().createdAt.toDate(),
                        sent: !!room?.['readData#randomUserOne']
                          ? room['readData#randomUserOne'].date.toDate() >
                            doc.data().createdAt.toDate()
                          : false,
                        pending: !!room?.['readData#randomUserOne']
                          ? room['readData#randomUserOne'].date.toDate() >
                            doc.data().createdAt.toDate()
                          : false,
                        received: !!room?.['readData#randomUserOne']
                          ? room['readData#randomUserOne'].date.toDate() >
                            doc.data().createdAt.toDate()
                          : false,
                      };
                    }),
                  ),
                ]);
              }
            });
        }}
        renderLoadEarlier={props => {
          return <LoadEarlier {...props} label="Load Previous Messages" />;
        }}
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
        documentSnapshot.docChanges().forEach(docChange => {
          console.log({type: docChange.type});
          if (docChange.type == 'added') {
            const updatedReadData = {};
            updatedReadData['readData#randomUserTwo'] = {
              date: new Date(),
            };
            docChange.doc.ref.update({...updatedReadData});
          }
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
