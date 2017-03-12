import React, { Component } from 'react';

import BottomDetails from '../App/BottomDetails.js';
import FilterNavBar from '../App/FilterNavBar.js';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: null,
      vibe: null,
      dollars: null,
      category: null,
      list:[]
    }

    this._onSelect = this._onSelect.bind(this);
    this.getQuery = this.getQuery.bind(this);
  }

  render() {
    return (
      <div>
        <FilterNavBar onSelect={this._onSelect} currentSelections={this.state} getQuery={this.getQuery}/>
        <BottomDetails selections={this.state} />
      </div>
    );
  }

  getQuery(event, {suggestionValue}) {
    this.setState({category: suggestionValue});
  }

  _onSelect(selected, name) {
    if (name === 'options') {
      this.setState({ options: selected.value });
    } else if (name === 'vibe') {
      this.setState({ vibe: selected.value });
    } else if (name === 'dollars') {
      this.setState({ dollars: selected.value });
    }

    if (this.props.openTableList.restaurants.length >= 1) {
      let filterNameSelected = this.props.openTableList.restaurants
      let filtered;

      if (name === 'dollars') {
        filtered = filterNameSelected.filter((item) => {
          if (item.dollars === selected.value) {
            return true;
          } else {
            return false;
          }
        });

      } else if (name === 'vibe') {
        filtered = filterNameSelected.filter((item) => {
          if (item.vibe === selected.value) {
            console.log('yooo')
            return true;
          } else {
            return false;
          }
        });
      }

      this.setState({list: filtered});
    }
  }
}

export default Homepage;
