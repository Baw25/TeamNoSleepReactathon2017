import React, {Component} from 'react';
import SearchBar from './SearchBar.js';
import './style.css';

const names = [
  'Italian',
  'Korean', 
  'Contemporary American',
  'Californian',
  'Japanese',
  'Chinese',
  'Spanish Tapas',
  'French',
  'Mexican',
  'Mediterranean',
  'Seafood',
  'Peruvian',
  'Moroccan'
];

// const travel =- [
//   'Walking',
//   'Driving',
//   ''
// ];


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
          // <input
          //   placeholder="Food Preferences"
          //   onChange={this.handleInput}
          // />

  //change the cursives here

  render() {
    return (
      <div className="header">
        <div className="header-location-item">
          <p className='filter-by'>Choose Your Filters:</p>
        </div>
          <div className='food-category-div'>        
            <SearchBar className='searchbar-food' />
          </div>
          <div className='budget-category-div'>        
            <SearchBar className='searchbar-food' />
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
