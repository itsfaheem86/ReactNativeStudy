import {Button, NativeModules, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

type Props = {};

const App = (props: Props) => {
  return (
    <SafeAreaView>
      <Button
        title="Increment"
        onPress={() =>
          NativeModules.Counter.increment((value: any) => {
            console.log(value);
          })
        }
      />
      <Button
        title="Decrement"
        onPress={async () => {
          try {
            const value = await NativeModules.Counter.decrement();
            console.log(value);
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
