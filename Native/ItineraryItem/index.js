import React, {
  Component,
} from 'react';

import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const padding = 10

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#eeeeee',
    padding: padding,
  },
  body: {
    marginTop: 10,
  },
  title: {
    color : '#2a2f43',
    flex : 1,
  }
});

class ItineraryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
      animation: new Animated.Value(),
    };

    this._boundToggle = this._toggle.bind(this);
    this._boundExpanded = this._setExpandedHeight.bind(this);
  }

  render() {
    const {
      animation,
    } = this.state;

    const {
      children,
      title,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this._boundToggle} >
        <View style={styles.container}>
            <Text style={styles.title}>
              {title}
            </Text>

          <Animated.View style={{ height: animation }}>
            <View
              style={styles.body}
              onLayout={this._boundExpanded}
            >
              {children}
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _toggle() {
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
    this.setState({ expandedHeight: height + padding });
  }
}

export default ItineraryItem;
