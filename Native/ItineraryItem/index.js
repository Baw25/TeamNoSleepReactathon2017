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

const contentHeight = 200;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    borderRadius: 5,
    margin: 10,
    paddingBottom: 5,
  },
  title: {
    color : '#2a2f43',
  },
  titleContainer: {
    flex : 1,
    padding: 10,
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
    } = this.state;

    const {
      endTime,
      name,
      startTime,
      img,
    } = this.props;

    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this._boundToggle}>
          <ItineraryTitle
            time={startTime}
            title={name}
          />
        </TouchableOpacity>

        <Animated.Image
          style={{ height: animation }}
          source={{ uri: img }}
        />
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
