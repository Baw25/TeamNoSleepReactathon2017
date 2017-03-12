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
  arrowContainer: {
    alignItems: 'flex-end',
    height: 16,
    paddingTop: 4,
    paddingRight: 8,
  },
  touchable: {
    flexGrow: 1,
  },
});

class ItineraryItem extends Component {
  constructor(props) {
    super(props);

    const { startExpanded } = props;

    this.state = {
      expanded: startExpanded,
      expansion: new Animated.Value(startExpanded ? contentHeight : 0),
    };

    this._boundToggle = this._toggleExpanded.bind(this);
  }

  render() {
    const {
      expansion,
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
        <TouchableOpacity onPress={this._boundToggle} style={styles.touchable}>
          <View style={styles.card}>
            <ItineraryTitle {...titleProps} />

            <Animated.Image
              style={{ height: expansion }}
              source={{ uri: img }}
            />

            <View style={styles.arrowContainer}>
              <Animated.Image
                style={{
                  height: 6,
                  width: 8,
                  transform: [{ rotate: expanded ? '0deg' : '180deg' }]
                }}
                source={require('./arrow.png')}
                tintColor='#ccc'
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _toggleExpanded() {
    const {
      expansion,
      expanded,
    } = this.state;

    const fromValue = expanded ? contentHeight : 0.0;
    const toValue = expanded ? 0.0 : contentHeight;

    this.setState({ expanded : !expanded });
    expansion.setValue(fromValue);
    Animated.timing(expansion, { toValue: toValue, duration: 100 }).start();
  }
}

export default ItineraryItem;
