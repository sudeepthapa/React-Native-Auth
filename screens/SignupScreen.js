// @ts-nocheck
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AuthContext from '../store/contexts/AuthContext';

const SignupScreen = props => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [fullName, setFullName] = React.useState('')
  const authContext = useContext(AuthContext);

  const handleSignup = () => {
    authContext.signUpUserWithFirebase({ email, password, fullName })
    props.navigation.navigate('Login')
  }

  return <ScrollView style={styles.screen}>
    <TextInput
      mode="outlined"
      value={fullName}
      onChangeText={text => setFullName(text)}
      placeholder="Full Name"
    />
    <TextInput
      mode="outlined"
      value={email}
      onChangeText={text => setEmail(text)}
      placeholder="Email"
    />
    <TextInput
      mode="outlined"
      value={password}
      onChangeText={text => setPassword(text)}
      placeholder="Password"
    />
    <Button onPress={handleSignup} mode="contained" style={{ marginTop: 30, marginBottom: 10 }}>Register Now!</Button>
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
      <Text>Already registered ?</Text>
      <Button onPress={() => props.navigation.navigate('Login')}>Login</Button>
    </View>
  </ScrollView>;
};

const styles = StyleSheet.create({
  screen: {
    padding:30
  }
});

export default SignupScreen;
