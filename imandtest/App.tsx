import CustomText from '@components/Text';
import Home from '@screens/Home';
import {View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <View>
      <Home></Home>
      <CustomText />
    </View>
  );
}

export default App;
