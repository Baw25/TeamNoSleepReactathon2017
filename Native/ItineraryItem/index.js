import React, {
  Component,
} from 'react';

import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#eeeeee',
  },
  body: {
    marginBottom: 10,
  },
  image: {
    height: 200,
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
      expanded: true,
      animation: new Animated.Value(),
    };

    this._boundToggle = this._toggleExpanded.bind(this);
    this._boundExpanded = this._setExpandedHeight.bind(this);
  }

  render() {
    const {
      animation,
    } = this.state;

    const {
      endTime,
      title,
      startTime,
      img,
    } = this.props;

    return (
      <View style={styles.container}>

        <TouchableWithoutFeedback onPress={this._boundToggle} >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{ height: animation }}
          onLayout={this._boundExpanded}
        >
          <View style={styles.body}>
            <Image
              source={{ uri: img }}
              style={styles.image}
            />
          </View>
        </Animated.View>
      </View>
    );
  }

  _toggleExpanded() {
    const {
      animation,
      expanded,
      expandedHeight
    } = this.state;
    const fromValue = expanded ? expandedHeight : 0.0;
    const toValue = expanded ? 0.0 : expandedHeight;

    this.setState({ expanded : !expanded });
    animation.setValue(fromValue);
    Animated.timing(animation, { toValue: toValue, duration: 100 }).start();
  }

  _setExpandedHeight(event) {
    if (this.state.expandedHeight !== undefined) {
      return;
    }

    const height = event.nativeEvent.layout.height;
    this.setState({ expandedHeight: height });
  }
}

export default ItineraryItem;
