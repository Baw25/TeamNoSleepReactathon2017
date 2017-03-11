/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  DeviceEventEmitter,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Itinerary from './itinerary'

const ITEM_CLICK_EVENT = 'ITEM_CLICK';

class android extends Component {

  _handleClick(event) {
    console.log(`${event.title}`)
  }

  componentWillMount() {
    const handleClick = (event) => {
      console.log(event)
    }

    DeviceEventEmitter.addListener(ITEM_CLICK_EVENT, this._handleClick)
  }

  render() {
    return (
      <View style={styles.fullpage}>
        <Itinerary
          style={styles.fullpage}
          items={
            [
              { title: 'Test', description: 'Test description', image: 'http://placehold.it/300x200?tmp=$position' },
              { title: 'Test', description: 'Test description', image: 'http://placehold.it/300x200?tmp=$position' },
              { title: 'Test', description: 'Test description', image: 'http://placehold.it/300x200?tmp=$position' },
              { title: 'Test', description: 'Test description', image: 'http://placehold.it/300x200?tmp=$position' },
            ]
          }
          clickHandler={ITEM_CLICK_EVENT}
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

export default android;