// @ts-nocheck
/* eslint-disable prettier/prettier */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './navigations/MainNavigation';
import AuthNavigation from './navigations/AuthNavigation';
import AuthProvider from './store/providers/AuthProvider';
import AuthContext from './store/contexts/AuthContext';
import SplashScreen from './screens/SplashScreen';

const App = () => {
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <AuthContext.Consumer>
            {
              (context) => {
                if (context.isAuthenticating) {
                  return <SplashScreen />
                }
                return !context.isAuthenticated ? <AuthNavigation /> : <MainNavigation />
              }
            }
          </AuthContext.Consumer>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
