'use strict';

import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';

var SearchResults = require('./SearchResults');

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  onSearchPressed() {
    this.props.navigator.push({
      component: SearchResults,
      title: 'Results',
      passProps: {
        searchQuery: this.state.searchQuery
      }
    });
  }


  render () {

    return (
      <View style={styles.container}>
        <TextInput onChangeText={(text) => this.setState({
          searchQuery: text})}
                   style={styles.input}
                   placeholder='Search Query'/>

        <TouchableHighlight
          style={styles.button}
          onPress={this.onSearchPressed.bind(this)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>


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
  }
});

module.exports = Search;