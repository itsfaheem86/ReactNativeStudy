/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './App';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async backgroundRemoteMessage => {
  console.log({backgroundRemoteMessage});
});

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    if (notification.foreground && notification.userInteraction) {
      // Forground click
    }
    if (!notification.foreground && notification.userInteraction) {
      // Background click
    }
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

// No need to create channel
// const channelId = 'heigh';
// PushNotification.createChannel(
//   {
//     channelId: channelId,
//     channelName: channelId,
//   },
//   created => console.log({created}),
// );

PushNotification.getChannels(function (channelIds) {
  console.log({channelIds});
});

AppRegistry.registerComponent(appName, () => App);
