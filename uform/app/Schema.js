import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextInput, View} from 'react-native';

const Schema = () => {
  const schema = yup.object().shape({
    value: yup.string().required('Required'),
  });

  const {
    control,
    formState: {errors, isValid},
    watch,
  } = useForm({resolver: yupResolver(schema), mode: 'all'});

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
        render={({field: {onChange, onBlur, value}}) => {
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

export default Schema;
