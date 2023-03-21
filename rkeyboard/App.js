import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={false ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentContainerStyle={{
          minWidth: '100%',
          minHeight: '100%',
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        contentInsetAdjustmentBehavior="automatic">
        <KeyboardAvoidingView
          behavior={'position'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
          <View style={{marginBottom: 300}}></View>
          <View style={{marginVertical: 25, width: '100%'}}>
            <Text>Enter your email</Text>
            <TextInput
              style={{
                borderRadius: 8,
                borderColor: 'black',
                borderWidth: 1,
              }}
            />
          </View>
          <View style={{marginBottom: 25, width: '100%'}}>
            <Text>Enter your password</Text>
            <TextInput
              style={{
                borderRadius: 8,
                borderColor: 'black',
                borderWidth: 1,
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
