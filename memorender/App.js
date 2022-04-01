import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Text, View} from 'react-native';
const App = () => {
  const [count, setCount] = useState(0);
  const [property, setProperty] = useState(0);
  // Need to prevent recreation
  // const [data, setData] = useState({isEvent: false});
  // const data = React.useMemo(()=>({isEvent: false}), []);
  const data = {isEvent: false};
  useEffect(() => {
    if (count % 5 === 0 && count != 0) {
      setProperty(Math.random());
    }
  }, [count]);
  const onPress = useCallback(() => setCount(Math.random()), []);

  // const InsideWithoutMemo = ({onPress, property, data}) => {
  //   return (
  //     <MemoChild onPress={onPress} property={property} data={data}></MemoChild>
  //   );
  // };

  return (
    <View>
      <Text>{count}</Text>
      <Button
        title="Count ++"
        onPress={() => {
          setCount(count + 1);
        }}></Button>
      <InsideWithoutMemo onPress={onPress} property={property} data={data} />
    </View>
  );
};

export default App;

const InsideWithoutMemo = ({onPress, property, data}) => {
  return (
    <MemoChild onPress={onPress} property={property} data={data}></MemoChild>
  );
};

const MemoChild = React.memo(
  ({onPress, property, data}) => {
    const renders = useRef(0);
    const [count, setCount] = useState(0);
    return (
      <View>
        <Text>{`Parent property : ${property}`}</Text>
        <Text>{`Count : ${count}`}</Text>
        <Text>{`Renders : ${renders.current++}`}</Text>
        <Button
          title="Increment"
          onPress={() => {
            setCount(count + 1);
            if (count % 2 === 0) {
              onPress();
            }
          }}></Button>
      </View>
    );
  },
  (previousProps, nextProps) => {
    console.log({previousProps, nextProps});
    // if (previousProps.data.isEvent === nextProps.data.isEvent) {
    //   return true;
    // }
    return false;
  },
);
