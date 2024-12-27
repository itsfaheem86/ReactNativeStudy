import {useEffect} from 'react';
import {
  Button,
  NativeModules,
  NativeEventEmitter,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

console.log({Counter: NativeModules.Counter});
console.log({CounterEvent: NativeModules.CounterEvent});
NativeModules.Counter.increment((value: any) =>
  console.log(`increment count: ${value}`),
);
console.log(NativeModules.Counter.getConstants());

type Props = {};

const CounterEvent = new NativeEventEmitter(NativeModules.CounterEvent);

const App = (props: Props) => {
  useEffect(() => {
    const iSubscription = CounterEvent.addListener(
      'onIncrement',
      (count: number) => {
        console.log(`onIncrement count: ${count}`);
      },
    );

    const dSubscription = CounterEvent.addListener(
      'onDecrement',
      (count: number) => {
        console.log(`onDecrement count: ${count}`);
      },
    );

    return () => {
      iSubscription.remove();
      dSubscription.remove();
    };
  }, []);

  const decrement = async () => {
    try {
      const count = await NativeModules.Counter.decrement();
      console.log(`decremented count: ${count}`);
    } catch (e) {
      console.error(e);
    }
  };

  const emitDecrement = async () => {
    try {
      const count = await NativeModules.CounterEvent.decrement();
      console.log(`decremented count: ${count}`);
    } catch (e) {
      console.error(e);
    }
  };

  const emitIncrement = () => {
    NativeModules.CounterEvent.increment((value: any) =>
      console.log(`increment count: ${value}`),
    );
  };

  return (
    <SafeAreaView>
      <Button title="Decrease count" onPress={decrement} />
      <Button title="Emit decrease count" onPress={emitDecrement} />
      <Button title="Emit increment count" onPress={emitIncrement} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
