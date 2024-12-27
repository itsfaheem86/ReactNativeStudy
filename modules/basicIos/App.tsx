import {Button, NativeModules, SafeAreaView, StyleSheet} from 'react-native';

console.log(NativeModules.Counter);
NativeModules.Counter.increment((value: any) =>
  console.log(`increment count: ${value}`),
);
console.log(NativeModules.Counter.getConstants());

type Props = {};

const App = (props: Props) => {
  const decrement = async () => {
    try {
      const count = await NativeModules.Counter.decrement();
      console.log(`decremented count: ${count}`);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <SafeAreaView>
      <Button title="Decrease count" onPress={decrement} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
