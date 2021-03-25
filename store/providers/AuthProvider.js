/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import AuthContext from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthProvider extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: false,
    error: false,
    authUser: {},
  };

  componentDidMount = async () => {
    this.setAuthenticating(true);
    const auth = await AsyncStorage.getItem('authenticated');
    console.log(auth)
    if (!auth) {
      this.setAuthenticated(false)
    } else {
      this.setAuthenticated(true)
      this.setAuthUser(JSON.parse(auth))
    }
    this.setAuthenticating(false)
  }

  signUpUser = async (user) => {
    try {
      const prevUsers = await AsyncStorage.getItem('users') || JSON.stringify([]);
      const allUsers = JSON.parse(prevUsers);
      const users = [...allUsers, user];

      await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch (e) {
      console.log(e)
    }
  }
  
  loginUser = async(email, password) => {
    try {
      const usersRes = await AsyncStorage.getItem('users') || JSON.stringify([]);
      const users = JSON.parse(usersRes);
      console.log(users)
      const user = users.find(u => u.email == email);
      if (user.email == email && user.password == password) {
        await AsyncStorage.setItem('authenticated', JSON.stringify(user));
        this.setAuthUser(JSON.stringify(user))
        this.setAuthenticated(true);
      } else {
        this.setAuthenticated(false);
        this.setAuthError(true)
      }
        
    } catch (e) {
      this.setAuthenticated(false)
      this.setAuthError(true)
    } finally {
      this.setAuthenticating(false)
    }
  }

  logOut = async() => {
    await AsyncStorage.removeItem('authenticated');
    this.setAuthenticated(false)
    this.setAuthUser({})
  }

  setAuthUser = (user) => {
    this.setState({
      ...this.state,
      authUser: user
    })
  }

  setAuthenticated = (isAuthenticated) => {
    this.setState({
      ...this.state,
      isAuthenticated
    })
  }
  setAuthenticating = (isAuthenticating) => {
    this.setState({
      ...this.state,
      isAuthenticating
    })
  }
  setAuthError = (error) => {
    this.setState({
      ...this.state,
      error
    })
  }

  render() {
    return (
      <AuthContext.Provider value={{
        ...this.state,
        setAuthUser: this.setAuthUser,
        setAuthError: this.setAuthError,
        setAuthenticated: this.setAuthenticated,
        setAuthenticating: this.setAuthenticating,
        signUpUser: this.signUpUser,
        loginUser: this.loginUser,
        logOut: this.logOut,
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
