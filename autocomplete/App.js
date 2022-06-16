import React from 'react';
import {View} from 'react-native';
import AutoComplete from './AutoComplete';

const App = () => {
  return (
    <View>
      <AutoComplete
        value={'Honda'}
        label="Model"
        data={['Honda', 'Yamaha', 'Suzuki', 'TVS']}
        menuStyle={{backgroundColor: 'white'}}
        onChange={() => {}}
      />
    </View>
  );
};

export default App;
