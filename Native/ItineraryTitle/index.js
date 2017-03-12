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
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: 75,
    padding: 5,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  description: {
    color: '#666666'
  },
  image: {
    backgroundColor: '#999999',
    height: 40,
    marginRight: 10,
    width: 40,
  },
  textContainer: {
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  time: {
    color: '#999999',
    marginBottom: 5,
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
    const dateString = moment(date).format('h:mm A');

    return (
      <View style={styles.container}>
        <Text style={styles.time}>{dateString}</Text>
        <View style={styles.contentContainer}>
          <View style={styles.image}/>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>Julian give me desc</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ItineraryTitle;
