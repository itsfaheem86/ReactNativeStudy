import {Text, TextInput, View} from 'react-native';
import React, {Fragment, Ref, useRef, useState} from 'react';

const App = () => {
  const length = 4;
  const otpInputRef = useRef<TextInput>(null);
  const otpInputCharRefs = useRef<Ref<TextInput>[]>([]);
  const [otpCode, setOtpCode] = useState('');

  const onOtpCodeChange = (text: string) => {
    setOtpCode(text);
  };

  return (
    <Fragment>
      <TextInput
        ref={otpInputRef}
        style={{
          width: 1,
          height: 1,
          padding: 0,
          position: 'absolute',
        }}
        onChangeText={onOtpCodeChange}
        maxLength={length}
      />
      <View
        style={{flexDirection: 'row', gap: 2, justifyContent: 'space-evenly'}}>
        {(() => {
          const otpInputs = [];
          for (let index = 0; index < length; index++) {
            const ref = useRef<TextInput>(null);

            const isAdding = false; // Need to modify this on adding and deleting

            const isActive =
              +(isAdding ? otpCode?.length + 1 : otpCode?.length) ===
                +(index + 1) ||
              (+(index + 1) === length && otpCode?.length === length) ||
              !(index || otpCode?.length);
            otpInputs.push(
              <View
                key={index}
                style={{
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {isActive && <Text style={{position: 'absolute'}}>|</Text>}
                <TextInput
                  value={otpCode?.[index]}
                  ref={ref}
                  style={{
                    borderWidth: 1,
                    width: 60,
                    textAlign: 'center',
                    borderColor: isActive ? 'blue' : 'black',
                  }}
                  onFocus={() => {
                    otpInputRef.current?.focus();
                  }}
                />
              </View>,
            );
            otpInputCharRefs.current.push(ref);
          }
          return otpInputs;
        })()}
      </View>
    </Fragment>
  );
};

export default App;
