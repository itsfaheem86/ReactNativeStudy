import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeStackNavigator from './screens/navigator/HomeStackNavigator';
import SettingsStackNavigator from './screens/navigator/SettingsStackNavigator';

const App = () => {
  const BottomTabNavigator = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <BottomTabNavigator.Navigator initialRouteName="home">
        <BottomTabNavigator.Screen
          name="homestack"
          component={HomeStackNavigator}></BottomTabNavigator.Screen>
        <BottomTabNavigator.Screen
          name="settingstack"
          component={SettingsStackNavigator}></BottomTabNavigator.Screen>
      </BottomTabNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
