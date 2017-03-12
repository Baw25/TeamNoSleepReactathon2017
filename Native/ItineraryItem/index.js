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
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    elevation: 4,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
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
      name,
      startTime,
      icon,
      img,
    } = this.props;

    const titleProps = {
      desc,
      icon,
      startTime,
      name,
    };

    return (
      <View
        style={[
          styles.container,
          { paddingBottom: expanded ? 16 : 0 }
        ]}
      >
        <TouchableOpacity onPress={this._boundToggle}>
          <ItineraryTitle {...titleProps} />
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
