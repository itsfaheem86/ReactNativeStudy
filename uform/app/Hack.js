import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';

const Hack = () => {
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
          setTimeout(() => {
            onChange((value || '') + 'f');
          }, 1000);
          return null;
        }}
        name="value"
      />
    </View>
  );
};

export default Hack;
