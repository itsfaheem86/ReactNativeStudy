import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeStackNavigator from './screens/navigator/HomeStackNavigator';
import SettingsStackNavigator from './screens/navigator/SettingsStackNavigator';

const App = () => {
  const BottomTabNavigator = createBottomTabNavigator();

  const linkingConfig = {
    screens: {
      HomeStack: {
        screens: {
          Home: 'homestack/home',
          Dashboard: 'homestack/dashboard',
        },
      },
      SettingsStack: {
        screens: {
          Settings: 'settingstack/settings',
          AdvancedSettings: 'settingstack/advanced_settings',
        },
      },
    },
  };

  const deepLinking = {
    prefixes: ['https://deeplinking'],
    config: linkingConfig,
  };

  return (
    <NavigationContainer linking={deepLinking}>
      <BottomTabNavigator.Navigator initialRouteName="HomeStack">
        <BottomTabNavigator.Screen
          name="HomeStack"
          component={HomeStackNavigator}></BottomTabNavigator.Screen>
        <BottomTabNavigator.Screen
          name="SettingsStack"
          component={SettingsStackNavigator}></BottomTabNavigator.Screen>
      </BottomTabNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
