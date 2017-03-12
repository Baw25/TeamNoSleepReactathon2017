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
  View,
} from 'react-native';

import DateNightToolbar from './DateNightToolbar';
import ItineraryItem from './ItineraryItem';
import ItineraryTitle from './ItineraryTitle';


class android extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };

    this._boundItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    fetch('https://x0u64jkdmd.execute-api.us-east-1.amazonaws.com/dev/itinerary')
      .then(response => response.json())
      .then(itinerary => {
        this.setState({ items: itinerary.schedule });
      });
  }

  render() {
    const { items } = this.state;
    return (
      <View style={styles.page}>
        <DateNightToolbar />
        <ScrollView style={styles.scrollview}>
          {items.map(this._boundItem)}
        </ScrollView>
      </View>
    );
  }

  _renderItem(item, index) {
    return (
      <ItineraryItem
        key={index}
        {...item}
      />
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    flexBasis: '100%',
  },
  scrollview: {
    backgroundColor: '#dfdfdf',
    flexGrow: 1,
    flexShrink: 0,
  },
  toolbar: {
    flexGrow: 0,
    flexShrink: 0,
  },
});

AppRegistry.registerComponent('android', () => android);

export default android;