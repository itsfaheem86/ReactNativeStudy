import React, {useRef} from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

const App = () => {
  const captureRef = useRef();
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ViewShot ref={captureRef}>
        <Button
          onPress={async () => {
            const uri = await captureRef.current.capture();
            const res = await Share.shareSingle({
              title: 'ReactNative Share MVP',
              subject: 'ReactNative Share MVP',
              message: 'Something useful I would say!',
              email: 'jstrfaheem065@gmail.com',
              social: Share.Social.EMAIL,
              failOnCancel: false,
              urls: [uri],
            });
            console.log({res});
          }}
          title="EMAIL SHARE"></Button>
        <View style={{marginTop: 20}}></View>
        <Button
          onPress={async () => {
            const uri = await captureRef.current.capture();
            const res = await Share.shareSingle({
              title: 'ReactNative Instagram Share MVP',
              social: Share.Social.INSTAGRAM,
              url: uri,
              failOnCancel: false,
            });
            console.log({res});
          }}
          title="INSTAGRAM SHARE"></Button>
      </ViewShot>
    </SafeAreaView>
  );
};

export default App;
