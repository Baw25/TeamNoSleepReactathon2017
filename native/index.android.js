/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Itinerary from './itinerary'

export default class android extends Component {
  render() {
    return (
      <View style={styles.fullpage}>
        <Itinerary
          style={styles.fullpage}
          items={
            [
              { title: 'Test', description: 'Test description' },
              { title: 'Test', description: 'Test description' },
              { title: 'Test', description: 'Test description' },
              { title: 'Test', description: 'Test description' },
            ]
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullpage: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '100%'
  }
});

AppRegistry.registerComponent('android', () => android);
