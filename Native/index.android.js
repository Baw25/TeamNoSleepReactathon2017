/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import ItineraryItem from './ItineraryItem';

class android extends Component {

  render() {
    return (
      <ScrollView style={styles.fullpage}>
        <ItineraryItem title="Hi">
          <Image
            source={{ uri: 'http://placehold.it/300x200' }}
            style={styles.image}
          />
          <Text>Hello everyone</Text>
        </ItineraryItem>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fullpage: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '100%'
  },
  image: {
    height: 200,
  }
});

AppRegistry.registerComponent('android', () => android);
AppRegistry.registerComponent('ItineraryItem', () => ItineraryItem);

export default android;