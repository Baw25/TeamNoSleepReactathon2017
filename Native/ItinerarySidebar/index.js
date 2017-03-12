import React, {
  Component,
} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 4,
    justifyContent: 'center',
    height: 24,
    marginBottom: -12,
    marginTop: -12,
    width: 24,
  },
  image: {
    height: 12,
    width: 12,
  },
  bar: {
    backgroundColor: '#aaa',
    width: 8,
  },
  bottom: {
    flexGrow: 1,
  },
  top: {
    height: 36,
  }
});

class ItinerarySidebar extends Component {
  render() {
    const {
      startTime,
      icon,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.bar, styles.top]} />
        <View style={styles.imageContainer}>
          <Image
            source={icons[icon]}
            style={styles.image}
          />
        </View>
        <View style={[styles.bar, styles.bottom]} />
      </View>
    );
  }
}

export default ItinerarySidebar;
