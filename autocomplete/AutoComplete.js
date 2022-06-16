import React, {useState} from 'react';
import {View} from 'react-native';
import {List, TextInput} from 'react-native-paper';

const AutoComplete = ({
  value: origValue,
  label,
  data,
  containerStyle,
  onChange: origOnChange,
  style = {},
  menuStyle = {},
  right = () => {},
  left = () => {},
}) => {
  const [value, setValue] = useState(origValue);
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const filterData = text => {
    return data.filter(
      val => val?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1,
    );
  };
  return (
    <View style={[containerStyle]}>
      <TextInput
        onFocus={() => {
          if (value.length === 0) {
            setMenuVisible(true);
          }
        }}
        // onBlur={() => setMenuVisible(false)}
        right={right}
        left={left}
        style={style}
        onChangeText={text => {
          origOnChange(text);
          if (text && text.length > 0) {
            setFilteredData(filterData(text));
          } else if (text && text.length === 0) {
            setFilteredData(data);
          }
          setMenuVisible(true);
          setValue(text);
        }}
        value={value}
      />
      {menuVisible && filteredData && (
        <View
          style={{
            borderWidth: 2,
            flexDirection: 'column',
            borderColor: 'grey',
          }}>
          {filteredData.map((datum, i) => (
            <List.Item
              key={i}
              onPress={() => {
                setValue(datum);
                setMenuVisible(false);
              }}
              title={datum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default AutoComplete;
