import React, {
  Component,
} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  description: {
    color: '#666666'
  },
  image: {
    height: 40,
    marginRight: 16,
    width: 40,
  },
  time: {
    color: '#999999',
    marginBottom: 8,
  },
  title: {
    color : '#000000',
  },
});

class ItineraryTitle extends Component {
  render() {
    const {
      desc,
      name,
    } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{desc}</Text>
      </View>
    );
  }
}

export default ItineraryTitle;
