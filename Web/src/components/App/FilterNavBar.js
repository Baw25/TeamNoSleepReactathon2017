import React, {Component} from 'react';
import SearchBars from './SearchBars.js';
import MultiSelect from './MultiSelect.js';
// import Dropdown from 'react-dropdown';
import ToggleButton from 'react-toggle-button'
import './style.css';

const travelTypes = ['Uber', 'Lyft', 'Taxi', 'Walking'];

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
      value: true
    };
  }

  render() {
    const {
      options,
      vibe,
      dollars,
    } = this.props.currentSelections;

    const defaultOption1 = options || "Transportation";
    const defaultOption2 = vibe || "Your kind of night";
    const budgetDefault = dollars || 'Budget Preference';
    return (
      <div className="filter-header">
        <div className="header-location-item">
          <p className="adventure-desc">Adventure Mode:</p>
          <ToggleButton
              colors={{
                activeThumb: {
                  base: 'rgb(73,255,168)',
                },
                inactiveThumb: {
                  base: 'rgb(255,87,73)',
                },
                active: {
                  base: 'rgb(65,66,68)',
                  hover: 'rgb(65,66,68)',
                },
                inactive: {
                  base: 'rgb(65,66,68)',
                  hover: 'rgb(95,96,98)',
                }
              }}
              value={ this.state.value || false }
              onToggle={(value) => {
                this.setState({
                  value: !value,
                })
              }} />
        </div>
          <div className='food-category-div'>   
            <MultiSelect
              selectionType='options'
              options={travelTypes}
              onChange={this.props.onSelect}
              value={defaultOption1}
              placeholder="Select an option" />     
          </div>
          <div className='food-category-div'>   
            <MultiSelect
              selectionType='vibe'
              options={dateTypes}
              onChange={this.props.onSelect}
              value={defaultOption2}
              placeholder="Select an option" />     
          </div>
          <div className='food-category-div'>   
            <SearchBars 
              getQuery={this.props.getQuery}
            />     
          </div>
          <div className='food-category-div'>   
            <MultiSelect
              selectionType='dollars'
              options={budgets}
              onChange={this.props.onSelect}
              value={budgetDefault}
              placeholder="Select an option" />     
          </div>
      </div> 
    );
  }
}

export default FilterNavBar;

