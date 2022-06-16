import React from 'react';
import {View} from 'react-native';
import AutoComplete from './AutoComplete';
import CustomComplete from './CustomComplete';

const App = () => {
  return <CustomComplete />;
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
