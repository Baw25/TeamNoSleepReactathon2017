import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var iface = {
  name: 'Itinerary',
  propTypes: {
    items: PropTypes.array,
    ...View.propTypes // include the default view properties
  },
};

module.exports = requireNativeComponent('Itinerary', iface);