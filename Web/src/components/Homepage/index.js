import React, { Component } from 'react';

import BottomDetails from '../App/BottomDetails.js';
import FilterNavBar from '../App/FilterNavBar.js';
import ActualModal from '../App/ActualModal.js';

class Homepage extends Component {

  render() {
    return (
      <div>
        <FilterNavBar/>
        <BottomDetails/>
        <ActualModal />
      </div>
    );
  }
}

export default Homepage;
