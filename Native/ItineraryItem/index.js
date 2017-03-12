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
      desc,
      endTime,
      icon,
      name,
      startTime,
      img,
    } = this.props;

    const sidebarProps = {
      icon,
      startTime,
    };

    const titleProps = {
      desc,
      name,
    };

    return (
      <View style={styles.container}>
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
