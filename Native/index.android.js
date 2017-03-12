import Dimensions from 'Dimensions';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './App';

const { width, height } = Dimensions.get('screen');

class android extends Component {
  render() {
    return (<App width={width} height={height}/> );
  }
}

AppRegistry.registerComponent('android', () => android);

export default android;