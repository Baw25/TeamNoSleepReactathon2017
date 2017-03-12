import React, {Component} from 'react';
import SearchBars from './SearchBars.js';
import MultiSelect from './MultiSelect.js';
// import Dropdown from 'react-dropdown';
import './style.css';

const options = ['Uber', 'Lyft', 'Taxi', 'Walking'];

const dateTypes = [
  "Trending spots only",
  "Keep it chill",
  "Sporty or dive bars",
  "I dig cocktails",
  "Keep it close to home",
  "Romantic only",
  "With live music"
];

const budgets = [
  "$",
  "$$",
  "$$$",
  "$$$$",
  "$$$$$"
];

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
    const defaultOption1 = "Transportation";
    const defaultOption2 = "Your kind of night";
    const budgetDefault = 'Budget Preference';
    return (
      <div className="header">
        <div className="header-location-item">
          <p className='filter-by'>Choose Your Filters:</p>
        </div>
          <div className='food-category-div'>   
            <MultiSelect 
              options={options} 
              onChange={this._onSelect} 
              value={defaultOption1} 
              placeholder="Select an option" />     
          </div>
          <div className='food-category-div'>   
            <MultiSelect 
              options={dateTypes} 
              onChange={this._onSelect} 
              value={defaultOption2} 
              placeholder="Select an option" />     
          </div>
          <div className='food-category-div'>   
            <SearchBars />     
          </div>
          <div className='food-category-div'>   
            <MultiSelect 
              options={budgets} 
              onChange={this._onSelect} 
              value={budgetDefault} 
              placeholder="Select an option" />     
          </div>
        <div className="header-subsection">
          <a className={this.state.highLightedIdx === 1 ? 'highlighted' : '' } onClick={() => this.handleClick(1)}></a>
        </div>
      </div> 
    );
  }
}

export default FilterNavBar;

