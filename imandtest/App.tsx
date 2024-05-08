import CustomText from '@components/Text';
import Home from '@screens/Home';
import {store} from '@src/redux/store';
import {View} from 'react-native';
import {Provider} from 'react-redux';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View>
        <Home></Home>
        <CustomText />
      </View>
    </Provider>
  );
}

export default App;
