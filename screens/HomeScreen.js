/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AuthContext from '../store/contexts/AuthContext';

const HomeScreen = props => {
  const authContext = React.useContext(AuthContext);
  return <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 30, fontFamily: 'Ubuntu-Bold' }}>Welcome { authContext.authUser.fullName } !</Text>
    <Button onPress={() => authContext.logOut() } mode="contained" style={{ marginTop: 30, marginBottom: 10 }}>Logout</Button>
  </View>;
};

const styles = StyleSheet.create({});

export default HomeScreen;
