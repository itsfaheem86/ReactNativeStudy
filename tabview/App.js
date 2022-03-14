import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import CollapsibleTabViewScreen from './src/screens/CollapsibleTabViewScreen';

const App = () => {
  const [mode, setMode] = useState('collapsible');

  const getDom = () => {
    switch (mode) {
      case 'collapsible':
        return <CollapsibleTabViewScreen />;
    }
  };

  return <SafeAreaView style={{flex: 1}}>{getDom()}</SafeAreaView>;
};

export default App;
