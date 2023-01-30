import React from 'react';
import {ScrollView, Text, View} from 'react-native';

function App(): JSX.Element {
  const arrayOne = Array(60).fill(0);
  const arrayTwo = Array(20).fill(0);
  return (
    <ScrollView>
      <ScrollView>
        {arrayOne.map((_, index) => {
          return <Text key={index}>One</Text>;
        })}
      </ScrollView>
      <ScrollView>
        {arrayTwo.map((_, index) => {
          return <Text key={index}>Two</Text>;
        })}
      </ScrollView>
    </ScrollView>
  );
}

export default App;
