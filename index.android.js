/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import ListView from './application/components/ListView';

export default class TodoApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ListView></ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  }
});

AppRegistry.registerComponent('TodoApp', () => TodoApp);
