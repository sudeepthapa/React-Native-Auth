/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import AuthContext from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://react-native-auth-23b5f-default-rtdb.firebaseio.com';

class AuthProvider extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: false,
    error: false,
    authUser: {},
    errorMessage: ''
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

  signUpUserWithFirebase = async (user) => {
    try {
      const userRes = await axios.post(`${BASE_URL}/users.json`, user);
      /**
       await axios.patch(`${BASE_URL}/users/-fdaihfdafha.json`, user); ----update item
       await axios.delete(`${BASE_URL}/users/-fdaihfdafha.json`);  ---- delete
       await axios.get(`${BASE_URL}/users/-fdaihfdafha.json`); ---- get individual item
       */
    } catch (error) {
      console.log(error)
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

  loginUserWithFirebase = async(email, password) => {
    try {
      const allUsers = await axios.get(`${BASE_URL}/users.json`);
      const usersIds = Object.keys(allUsers.data)
      const users = usersIds.map(userId => {
        return {
          ...allUsers.data[userId],
          id: userId
        }
      })
      const loginUser = users.find(user => user.email === email)
      var err = "";
      if (loginUser) {
        if (loginUser.password !== password) {
          err = "Email and Password donot match";
          this.setAuthenticated(false);
        } else {
          await AsyncStorage.setItem('authenticated', JSON.stringify(loginUser));
          this.setAuthUser(JSON.stringify(loginUser));
          this.setAuthenticated(true);
          this.setAuthError(false);
          this.setState({
            ...this.state,
            errorMessage: ''
          })
        }
      } else {
        this.setAuthenticated(false);
        err = "User with given email doesnot exist."
      }
      this.setState({
        ...this.state,
        errorMessage: err
      })
    } catch (error) {
      console.log(error)
      this.setAuthenticated(false);
      this.setState({
        ...this.state,
        errorMessage: "Something went wrong!"
      })
    }
    finally {
      this.setAuthenticating(false)
    }
  }

  logOut = async() => {
    await AsyncStorage.removeItem('authenticated');
    this.setAuthenticated(false)
    this.setAuthUser({})
    this.setAuthError(false)
    this.setState({
      ...this.state,
      errorMessage: ''
    })
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
        signUpUserWithFirebase: this.signUpUserWithFirebase,
        loginUserWithFirebase: this.loginUserWithFirebase
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
