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
  car: require('./car.png'),
  cocktails: require('./cocktails.png'),
  dish: require('./dish.png'),
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
  imageContainerInverse: {
    alignItems: 'center',
    backgroundColor: '#ff5645',
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
    tintColor: '#ff5645',
  },
  imageInverse: {
    height: 12,
    width: 12,
    tintColor: '#fff',
  },
  bar: {
    width: 8,
  },
  bottom: {
    flexGrow: 1,
  },
  top: {
    height: 36,
  },
  filled: {
    backgroundColor: '#cccccc',
  },
});

class ItinerarySidebar extends Component {
  render() {
    const {
      bottom,
      icon,
      name,
      top,
    } = this.props;

    const mystery = name === 'Adventure';

    const topStyles = [styles.bar, styles.top];
    if (top) topStyles.push(styles.filled);

    const bottomStyles = [styles.bar, styles.bottom];
    if (bottom) bottomStyles.push(styles.filled);

    return (
      <View style={styles.container}>
        <View style={topStyles} />
        <View style={mystery ? styles.imageContainerInverse : styles.imageContainer}>
          <Image
            source={icons[icon]}
            style={mystery ? styles.imageInverse : styles.image}
          />
        </View>
        <View style={bottomStyles} />
      </View>
    );
  }
}

export default ItinerarySidebar;
