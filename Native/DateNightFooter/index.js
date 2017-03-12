import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

class DateNightFooter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./logo.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#374249',
    flexDirection: 'row',
    height: 56,
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
    elevation: 16,
  },
});

module.exports = DateNightFooter;
