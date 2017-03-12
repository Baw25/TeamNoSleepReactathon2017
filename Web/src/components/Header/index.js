import React from 'react';
import './style.css';

class Header extends React.Component {
  constructor() {
    super();
  
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
            placeholder="San Francisco"
            onChange={this.handleInput}
          />
        </div>
        <div className="header-subsection">
          <a className={this.state.highLightedIdx === 1 ? 'highlighted' : '' } onClick={() => this.handleClick(1)}>Date Nights</a>
          <a className={this.state.highLightedIdx === 2 ? 'highlighted' : '' } onClick={() => this.handleClick(2)}>Account</a>
          <a className={this.state.highLightedIdx === 3 ? 'highlighted' : '' } onClick={() => this.handleClick(3)}>Message</a>
        </div>
      </div> 
    );
  }
}

export default Header;