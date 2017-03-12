import Dimensions from 'Dimensions';
import React, { Component } from 'react';
import {
  Animated,
  AppRegistry,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';

import DateNightFooter from './DateNightFooter';
import DateNightToolbar from './DateNightToolbar';
import ItineraryItem from './ItineraryItem';
import ItineraryTitle from './ItineraryTitle';

const autoExpandList = [
  'Dinner',
  'Movie',
];

const { width, height } = Dimensions.get('screen');

class android extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fade: new Animated.Value(1.0),
      itinerary: { user: '', pair: '', schedule: [] },
    };

    this._boundItem = this._renderItem.bind(this);
    this._boundSplash = this._renderSplash.bind(this);
  }

  componentDidMount() {
    fetch('https://x0u64jkdmd.execute-api.us-east-1.amazonaws.com/dev/ritinerary')
      .then(response => response.json())
      .then(itinerary => {
        Animated
          .timing(this.state.fade, { toValue: 0.0, duration: 750 })
          .start(payload => {
            if (payload.finished) {
              this.setState({ fadeFinished: true });
            }
          });

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
          <View style={{ height: 50 }} />
        </ScrollView>
        <DateNightFooter />
        {this._boundSplash()}
      </View>
    );
  }

  _renderSplash() {
    const {
      fade,
      fadeFinished,
    } = this.state;

    return fadeFinished ? null : (
      <Animated.View
        style={[
          styles.overlay,
          { opacity: fade },
        ]}
      >
        <Image source={require('./DateNightFooter/logo.png')} />
      </Animated.View>
    );
  }

  _renderItem(item, index, items) {
    const startExpanded = autoExpandList.includes(item.name);

    return (
      <ItineraryItem
        key={index}
        startExpanded={startExpanded}
        top={index > 0}
        bottom={index < items.length - 1}
        {...item}
      />
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: '#374249',
    justifyContent: 'center',
    paddingBottom: 120,
    position: 'absolute',
    top: 0,
    left: 0,
    elevation: 32,
    width: width,
    height: height,
  },
  page: {
    flexGrow: 1,
    flexBasis: '100%',
  },
  scrollview: {
    backgroundColor: '#dfdfdf',
    flexGrow: 1,
  },
  toolbar: {
    flexGrow: 0,
    flexShrink: 0,
  },
});

AppRegistry.registerComponent('android', () => android);

export default android;