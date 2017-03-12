import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'space-between',
    padding: 12,
  },
  description: {
    color : '#000000',
    fontSize: 16,
    marginTop: 8,
  },
  title: {
    color: '#666666',
    fontSize: 12,
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
        <Text style={styles.title}>{name.toUpperCase()}</Text>
        <Text style={styles.description}>{desc}</Text>
      </View>
    );
  }
}

export default ItineraryTitle;
