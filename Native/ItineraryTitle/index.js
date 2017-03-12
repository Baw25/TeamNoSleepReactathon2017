import moment from 'moment';

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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 16,
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
    height: 40,
    marginRight: 16,
    width: 40,
  },
  textContainer: {
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  time: {
    color: '#999999',
    marginBottom: 8,
  },
  title: {
    color : '#000000',
  },
});


const icons = {
  bench: require('./bench.png'),
  calendar: require('./calendar.png'),
  car: require('./car.png'),
  coffee: require('./coffee.png'),
  dish: require('./dish.png'),
  fireworks: require('./fireworks.png'),
  location: require('./location.png'),
  meat: require('./meat.png'),
  movie: require('./movie.png'),
  muffin: require('./muffin.png'),
  park: require('./park.png'),
  table: require('./table.png'),
  tickets: require('./tickets.png'),
  walking: require('./walking.png'),
};

class ItineraryTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      icon,
      title,
      time,
    } = this.props;

    const date = new Date(time);
    const dateString = moment(date).format('h:mm A');

    return (
      <View style={styles.container}>
        <Text style={styles.time}>{dateString}</Text>
        <View style={styles.contentContainer}>
          <Image
            source={icons[icon]}
            style={styles.image}
          />
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
