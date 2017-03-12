import React, { Component } from 'react';

import BottomDetails from '../App/BottomDetails.js';
import FilterNavBar from '../App/FilterNavBar.js';

class Homepage extends Component {
  render() {
    return (
      <div>
        <FilterNavBar/>
        <BottomDetails/>
      </div>
    );
  }
}

export default Homepage;
