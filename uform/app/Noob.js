import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextInput, View} from 'react-native';

const Noob = () => {
  const {
    control,
    formState: {errors, isValid},
    watch,
  } = useForm({mode: 'all'});

  const value = watch('value');
  console.log({value, errors, isValid});

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 5,
          maxLength: 10,
        }}
        render={({field: {onChange, onBlur, value}}) => {
          // setTimeout(() => {
          //   onChange((value || '') + 'f');
          // }, 1000);
          return (
            <TextInput
              style={{borderColor: 'black', borderWidth: 1, width: '80%'}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          );
        }}
        name="value"
      />
    </View>
  );
};

export default Noob;
