import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import Routes from './routes';
import firebase from "firebase";

const config = {
    apiKey: "AIzaSyCZOIi5P0Zw8rJ1EW_StUzU0ZOVg9LAlew",
    authDomain: "wedding-a7fe2.firebaseapp.com",
    databaseURL: "https://wedding-a7fe2.firebaseio.com",
    projectId: "wedding-a7fe2",
    storageBucket: "wedding-a7fe2.appspot.com",
    messagingSenderId: "1062788160971"
  };
  firebase.initializeApp(config);
export default class App extends React.Component {
  render() {
      return (
          <Routes/>
      );
    }
  }
