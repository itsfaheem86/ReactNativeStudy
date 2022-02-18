import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DashboardScreen from '../DashboardScreen';
import HomeScreen from '../HomeScreen';

const HomeStackNavigator = () => {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator initialRouteName="dashboard">
      <HomeStack.Screen
        name="Home"
        options={{headerShown: false}}
        component={HomeScreen}></HomeStack.Screen>
      <HomeStack.Screen
        name="Dashboard"
        options={{headerShown: false}}
        component={DashboardScreen}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
