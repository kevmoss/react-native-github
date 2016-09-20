'use strict';

import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, ActivityIndicatorIOS } from 'react-native';
import buffer from 'buffer';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      showProgress: false
    }
  }
  onLoginPressed () {
    console.log('Attempting to login with' + ' ' + this.state.username);
    this.setState({showProgress: true});

    let b = new buffer.Buffer(this.state.username + ':' + this.state.password);
    let encodedAuth = b.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization' : 'Basic ' + encodedAuth
      }
    })
      .then(res => {
        if(res.status >= 200 && res.status <300) {
          return res;
        }
        if(res.status == 401){
          throw 'Bad Credentials'
        }
        throw 'Unknown Error'

      })
      .then (res => {
        return res.json()
      })
      .then (res => {
        console.log(res);
        this.setState({showProgress: false});
      })
      .catch(err => {
        console.log('Error is ' + err);
      })
      .finally(() => {
          this.setState({showProgress: false});
        })
  }

  render () {
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
                    secureTextEntry='true'/>
        <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>

        <ActivityIndicatorIOS style={styles.loader}
                              animating={this.state.showProgress}
                              size='large'/>

        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
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
  }
});

module.exports = Login;