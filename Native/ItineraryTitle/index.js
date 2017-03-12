import moment from 'moment';

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
    alignItems: 'center',
    flex : 1,
    flexDirection: 'row',
    padding: 5,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    backgroundColor: '#999999',
    height: 40,
    marginRight: 10,
    width: 40,
  },
  time: {
    color: '#666666',
  },
  title: {
    color : '#000000',
  },
});

class ItineraryTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      time,
    } = this.props;

    const date = new Date(time);
    const dateString = moment(date).format('ddd h:mm a');

    return (
      <View style={styles.container}>
        <View style={styles.image}/>
        <View style={styles.contentContainer}>
          <Text style={styles.time}>{dateString}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    );
  }
}

export default ItineraryTitle;
