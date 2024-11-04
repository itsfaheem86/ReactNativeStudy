import {Text, View} from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

const App = () => {
  console.log();
  return (
    <View>
      <Text>{`Current env : ${Config.NODE_ENV}`}</Text>
      <Text>{`Package name : ${DeviceInfo.getBundleId()}`}</Text>
      <Text>{`App name : ${DeviceInfo.getApplicationName()}`}</Text>
      <Text>{`Permissions : ${DeviceInfo.getApplicationName()}`}</Text>
    </View>
  );
};

export default App;
