import React, {useState} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {List, TextInput} from 'react-native-paper';

const CustomComplete = ({}) => {
  const [keyWords, setKeyWords] = useState([
    'Honda',
    'Yamaha',
    'Suzuki',
    'TVS',
  ]);
  const [positionTop, setPositionTop] = useState(64);
  const [menuVisible, setMenuVisible] = useState(false);
  const [text, setText] = useState('');
  return (
    <View style={{position: 'relative'}}>
      <TextInput
        onFocus={() => {
          if (text.length === 0) {
            setMenuVisible(true);
          }
        }}
        // onBlur={() => setMenuVisible(false)}
        onChangeText={text => {
          // if (text && text.length > 0) {
          //   setFilteredData(filterData(text));
          // } else if (text && text.length === 0) {
          //   setFilteredData(data);
          // }
          setMenuVisible(true);
          setText(text);
        }}
        value={text}
      />
      <View
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          setPositionTop(layout.y);
        }}
        style={{
          width: '100%',
          height: 200,
          backgroundColor: 'black',
        }}></View>
      {menuVisible && (
        <View
          style={{
            position: 'absolute',
            elevation: Platform.select({ios: 0, android: 99}),
            zIndex: 99,
            width: '100%',
            top: positionTop,
            backgroundColor: 'green',
          }}>
          {keyWords
            .filter(keyWord => {
              if (keyWord?.toLowerCase().includes(text?.toLowerCase())) {
                return true;
              }
              return false;
            })
            .map((keyWord, i) => (
              <List.Item
                key={i}
                onPress={() => {
                  setText(keyWord);
                  setMenuVisible(false);
                }}
                style={{borderBottomColor: 'black', borderBottomWidth: 1}}
                right={({color, style}) => (
                  <TouchableOpacity
                    style={[
                      style,
                      {
                        backgroundColor: 'red',
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}
                    onPress={() => {
                      setKeyWords([
                        ...keyWords.filter(key2Word => key2Word != keyWord),
                      ]);
                    }}>
                    <Text style={{color: 'white'}}>x</Text>
                  </TouchableOpacity>
                )}
                title={keyWord}
              />
            ))}
        </View>
      )}
    </View>
  );
};

export default CustomComplete;
