import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {Button, SafeAreaView, ScrollView, View} from 'react-native';
function App(): JSX.Element {
  async function onDisplayLocalNotification() {
    await notifee.requestPermission();
    // This will create notification channel
    const channelId = await notifee.createChannel({
      id: 'default',
      // Any name
      name: 'DEFAULT CHANNEL',
    });
    await notifee.displayNotification({
      title: 'TITLE',
      body: 'BODY OF THE NOTIFICATION',
      android: {
        channelId,
        // smallIcon: 'ic_launcher',
        pressAction: {
          // Id should be something not random
          id: 'default',
        },
      },
    });
  }

  async function onAllowRemoteNotification() {
    // Not for push notification but for receiving message from external providers
    // This will ask permission from
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log({authStatus, enabled});
    if (enabled) {
      // Before getting token we need to register
      // On ios if we need to receive message
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      const token = await messaging().getToken();
      console.log({token});
    }
  }

  // Listening to foreground messages
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log({remoteMessage});
      const notification = remoteMessage.notification;
      notifee.displayNotification({
        title: notification?.title,
        body: notification?.body,
        android: {
          // Channel id should be created ones and should have permission
          channelId: 'default',
          // Actions showing action in the notification widget but I don't know how to configure it for now
          // actions: [
          //   {
          //     title: 'READ',
          //     pressAction: {
          //       id: 'READ',
          //     },
          //   },
          // ],
        },
      });
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Button onPress={onDisplayLocalNotification} title="LOCAL PUSH" />
          <Button onPress={onAllowRemoteNotification} title="REMOTE PUSH" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
