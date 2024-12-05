import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  AnimationBackgroundCard,
  AnimationToast,
  AnimationTopTab,
  AnimationScratchCard,
  AnimationParallaxCarousel,
  AnimationStackCard,
  AnimationTextInput,
  AnimationSwitch,
  AnimationCounter,
  AnimationRefresh,
} from './src';
import {Text, View} from 'react-native';

const App = () => {
  const [value, setValue] = useState(false);
  return (
    <SafeAreaProvider>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* <AnimationTopTab
          horizontalScrollData={[{name: 'Tab1'}, {name: 'Tab2'}]}
          verticalScrollData={[
            {component: <Text>Hi1</Text>},
            {component: <Text>Hi2</Text>},
          ]}
        /> */}
        {/* <AnimationToast /> */}
        {/* <AnimationScratchCard /> */}
        {/* <AnimationParallaxCarousel /> */}
        {/* <AnimationStackCard /> */}
        {/* <AnimationTextInput /> */}
        {/* <AnimationSwitch value={value} handleOnPress={setValue} /> */}
        {/* <AnimationCounter /> */}
        <AnimationRefresh />
      </View>
    </SafeAreaProvider>
  );
};

export default App;
