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
      category: null
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
    this.setState({category: suggestionValue)};
  }

  _onSelect(selected, name) {
    console.log(selected);
    if (name === 'options') {
      this.setState({ options: selected.value });
    } else if (name === 'vibe') {
      this.setState({ vibe: selected.value });
    } else if (name === 'dollars') {
      this.setState({ dollars: selected.value });
    }
  }
}

export default Homepage;
