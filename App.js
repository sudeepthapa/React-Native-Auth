/* eslint-disable prettier/prettier */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './navigations/MainNavigation'
import AuthNavigation from './navigations/AuthNavigation'

const App = () => {
  const isAuthenticated = false;
  return (
    <PaperProvider>
      <NavigationContainer>
        {
          !isAuthenticated ? <AuthNavigation /> : <MainNavigation />
        }
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
