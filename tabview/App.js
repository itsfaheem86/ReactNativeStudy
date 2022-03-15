import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import CollapsibleTabViewScreenFix from './src/screens/CollapsibleTabViewScreenFix';

const App = () => {
  const [mode, setMode] = useState('collapsible');

  const getDom = () => {
    switch (mode) {
      case 'collapsible':
        return <CollapsibleTabViewScreenFix />;
    }
  };

  return <SafeAreaView style={{flex: 1}}>{getDom()}</SafeAreaView>;
};

export default App;
