
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicatorIOS } from 'react-native';

import Login from './Login';
import AppContainer from './AppContainer';
import AuthService from './AuthService';

var finder = React.createClass({
  componentDidMount: function () {
    AuthService.getAuthInfo((err, authInfo)=> {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  },

  render: function () {
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
            animating={true}
            size="large"
            style={styles.loader} />
        </View>
      )
    }

    if(this.state.isLoggedIn){
      return (
        <AppContainer/>
      )
    }else{
      return (
        <Login onLogin={this.onLogin}/>
      );
    }
  },
  onLogin: function() {
    this.setState({isLoggedIn: true})
  },
  getInitialState: function() {
    return {
      isLoggedIn: false,
      checkingAuth: true
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 40
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('finder', () => finder);
