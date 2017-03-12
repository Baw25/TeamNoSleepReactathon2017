/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import ItineraryItem from './ItineraryItem';

class android extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        { title: 'Hello this is title', url: 'http://placehold.it/300x200' },
        { title: 'Hello this is other', url: 'http://placehold.it/200x100' },
        { title: 'Bye this', url: 'http://placehold.it/800x120' },
        { title: 'Bye is this hello', url: 'http://placehold.it/400x400' },
      ]
    };

    this._boundItem = this._renderItem.bind(this);
  }

  render() {
    const { items } = this.state;
    return (
      <ScrollView style={styles.fullpage}>
        {items.map(this._boundItem)}
      </ScrollView>
    );
  }

  _renderItem(item, index) {
    return (<ItineraryItem key={index} {...item} />);
  }
}

const styles = StyleSheet.create({
  fullpage: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '100%'
  },
});

AppRegistry.registerComponent('android', () => android);
AppRegistry.registerComponent('ItineraryItem', () => ItineraryItem);

export default android;