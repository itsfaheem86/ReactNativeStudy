import {Text, View} from 'react-native';
import Config from 'react-native-config';

const App = () => {
  console.log();
  return (
    <View>
      <Text>{`Current env : ${Config.NODE_ENV}`}</Text>
    </View>
  );
};

export default App;
