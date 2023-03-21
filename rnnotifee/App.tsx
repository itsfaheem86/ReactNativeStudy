import notifee from '@notifee/react-native';
import React from 'react';
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

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Button onPress={onDisplayLocalNotification} title="LOCAL PUSH" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
