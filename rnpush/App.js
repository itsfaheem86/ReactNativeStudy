import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

const App = () => {
  useEffect(() => {
    let unsubscribeOnMessage = () => {};
    let unsubscribeonNotificationOpenedApp = () => {};
    (async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        messaging()
          .getInitialNotification()
          .then(async initialRemoteMessage => {
            if (initialRemoteMessage) console.log({initialRemoteMessage});
          });
        unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
          console.log({remoteMessage});
        });
        // UDEV Need to resolve
        unsubscribeonNotificationOpenedApp =
          messaging().onNotificationOpenedApp(async openedRemoteMessage => {
            console.log({openedRemoteMessage});
          });
      }
    })();
    return () => {
      unsubscribeOnMessage();
      unsubscribeonNotificationOpenedApp();
      console.log({msg: 'App.onDestroy'});
    };
  }, []);
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default App;
