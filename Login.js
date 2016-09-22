'use strict';

import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProgress: false
    }
  }

  onLoginPressed() {
    console.log('Attempting to login with' + ' ' + this.state.username);
    this.setState({showProgress: true});

    var authService = require('./AuthService');
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results));

      if(results.success && this.props.onLogin){
        this.props.onLogin();
      }
    });
  };


  render () {

    let errorCtrl = <View />;
    if(!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        Invalid Username Or Password!
      </Text>
    }
    if(!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
        Unknown Error!
      </Text>
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo}
               source={{uri: 'https://assets-cdn.github.com/images/modules/logos_page/Octocat.png'}}/>
        <Text style={styles.heading}>Github Browser</Text>
        <TextInput onChangeText={(text) => this.setState({username: text})}
                   style={styles.input}
                   placeholder='Username'/>
        <TextInput onChangeText={(text) => this.setState({password: text})}
                   style={styles.input}
                   placeholder='Password'
                   secureTextEntry={true}/>
        <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>
        {errorCtrl}
        <ActivityIndicator style={styles.loader}
                           animating={this.state.showProgress}
                           size='large'/>


      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center'
  },
  logo: {
    height:150,
    width: 150,
    paddingTop: 40
  },
  heading: {
    marginTop: 20,
    fontSize: 30
  },
  input: {
    height: 40,
    marginTop: 10,
    padding: 4,
    fontSize: 15,
    borderWidth: 2,
    borderColor: 'blue',
    alignSelf: 'stretch'
  },
  button: {
    height: 50,
    backgroundColor: 'blue',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'whitesmoke',
    fontSize: 20,
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    marginTop: 5
  }

});

module.exports = Login;