/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return <MainStack.Navigator>
    <MainStack.Screen name="Home" component={HomeScreen} />
    <MainStack.Screen name="Profile" component={ProfileScreen} />
  </MainStack.Navigator>;
};

export default MainStackNavigator;