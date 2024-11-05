import {SafeAreaView, Text} from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

const App = () => {
  console.log(Config.NODE_ENV);
  return (
    <SafeAreaView>
      <Text>{`Current env : ${Config.NODE_ENV}`}</Text>
      <Text>{`Package name : ${DeviceInfo.getBundleId()}`}</Text>
      <Text>{`App name : ${DeviceInfo.getApplicationName()}`}</Text>
    </SafeAreaView>
  );
};

export default App;
