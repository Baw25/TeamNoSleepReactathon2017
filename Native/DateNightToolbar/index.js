import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  date: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 4,
    justifyContent: 'center',
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
    height: 40,
    width: 40,
  },
  day: {
    color: '#ff5645',
    fontSize: 16,
    marginTop: -2,
  },
  month: {
    color: '#ff5645',
    fontSize: 8,
  },
  description: {
    color: '#ffffff',
    fontSize: 12,
  },
  descriptionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
  },
  toolbar: {
    alignItems: 'center',
    backgroundColor: '#ff5645',
    elevation: 8,
    height: 108,
    justifyContent: 'center',
  },
});

class DateNightToolbar extends Component {
  render() {
    return (
      <View style={styles.toolbar}>
        <Text style={styles.title}>S  C  H  E  D  U  L  E</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>J O H N   K I M</Text>
          <View style={styles.date}>
            <Text style={styles.day}>29</Text>
            <Text style={styles.month}>AUG</Text>
          </View>
          <Text style={styles.description}>C H I M I   K I M</Text>
        </View>
      </View>
    );
  }
}

export default DateNightToolbar;
