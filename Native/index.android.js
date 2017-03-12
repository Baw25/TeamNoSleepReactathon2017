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

    this.state = { items: [] };

    this._boundItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    fetch('https://x0u64jkdmd.execute-api.us-east-1.amazonaws.com/dev/itinerary')
      .then(response => response.json())
      .then(itineraries => {
        this.setState({ items: itineraries });
      });
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