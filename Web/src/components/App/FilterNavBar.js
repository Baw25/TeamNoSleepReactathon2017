import React, {Component} from 'react';
import './style.css';

class FilterNavBar extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      currentLocation: 'San Francisco',
      highLightedIdx: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleClick(idx) {
    console.log(idx);
    this.setState({highLightedIdx: idx});
  }

  handleInput(e) {
    this.setState({
      currentLocation: e.target.value
    });
  }

  render() {
    return (
      <div className="header">
        <div className="header-location-item">
          <input
            placeholder="Food Preferences"
            onChange={this.handleInput}
          />
        </div>
        <div className="header-subsection">
          <a className={this.state.highLightedIdx === 1 ? 'highlighted' : '' } onClick={() => this.handleClick(1)}>Italian</a>
          <a className={this.state.highLightedIdx === 2 ? 'highlighted' : '' } onClick={() => this.handleClick(2)}>Californian</a>
          <a className={this.state.highLightedIdx === 3 ? 'highlighted' : '' } onClick={() => this.handleClick(3)}>Tapas</a>
        </div>
      </div> 
    );
  }
}

export default FilterNavBar;
