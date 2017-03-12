import moment from 'moment';

import React, {
  Component,
} from 'react';

import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ItineraryTitle from '../ItineraryTitle';
import ItinerarySidebar from '../ItinerarySidebar';

const contentHeight = 200;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    elevation: 4,
    flexGrow: 1,
    margin: 16,
  },
  container: {
    flexDirection: 'row',
    marginLeft: 16,
  },
  time: {
    color: '#666666',
    fontSize: 12,
  },
  timeContainer: {
    alignItems: 'flex-end',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 28,
    width: 56,
  },
});

class ItineraryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      animation: new Animated.Value(0),
    };

    this._boundToggle = this._toggleExpanded.bind(this);
  }

  render() {
    const {
      animation,
      expanded,
    } = this.state;

    const {
      bottom,
      desc,
      endTime,
      icon,
      img,
      name,
      startTime,
      top,
    } = this.props;

    const sidebarProps = {
      bottom,
      icon,
      top,
    };

    const titleProps = {
      desc,
      name,
    };

    const time = new Date(startTime * 1000);
    const timeString = moment(time).format('h:mm A');

    return (
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{timeString}</Text>
        </View>
        <ItinerarySidebar {...sidebarProps} />
        <View style={styles.card}>
          <TouchableOpacity onPress={this._boundToggle}>
            <ItineraryTitle {...titleProps} />
          </TouchableOpacity>

          <Animated.Image
            style={{ height: animation, marginBottom: expanded ? 16 : 0 }}
            source={{ uri: img }}
          />
        </View>
      </View>
    );
  }

  _toggleExpanded() {
    const {
      animation,
      expanded,
    } = this.state;

    const fromValue = expanded ? contentHeight : 0.0;
    const toValue = expanded ? 0.0 : contentHeight;

    this.setState({ expanded : !expanded });
    animation.setValue(fromValue);
    Animated.timing(animation, { toValue: toValue, duration: 100 }).start();
  }
}

export default ItineraryItem;
