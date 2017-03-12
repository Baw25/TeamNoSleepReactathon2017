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

    this.state = { itinerary: { user: 'John Kim', pair: 'Chimi Kim', schedule: [] } };

    this._boundItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    fetch('https://x0u64jkdmd.execute-api.us-east-1.amazonaws.com/dev/ritinerary')
      .then(response => response.json())
      .then(itinerary => {
        this.setState({ itinerary });
      });
  }

  render() {
    const { user, pair, schedule } = this.state.itinerary;
    const startTime = schedule.length > 0 ? schedule[0].startTime : 0;
    const toolbarParam = { user, pair, startTime };

    return (
      <View style={styles.page}>
        <DateNightToolbar {...toolbarParam} />
        <ScrollView style={styles.scrollview}>
          {schedule.map(this._boundItem)}
          <View style={{ height: 200 }} />
        </ScrollView>
      </View>
    );
  }

  _renderItem(item, index, items) {
    return (
      <ItineraryItem
        key={index}
        top={index > 0}
        bottom={index < items.length - 1}
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