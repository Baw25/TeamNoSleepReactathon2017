import React, {Component} from 'react';
import SearchBars from './SearchBars.js';
// import MultiSelect from './MultiSelect.js';
import TextSelect from 'react-textselect';
import 'react-textselect/dist/textselect.css';
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
          <p className='filter-by'>Choose Your Filters:</p>
        </div>
          <div className='food-category-div'>        
            <TextSelect
              options={['Surprise Me!', 'Keep it chill', 'Let us rage']}
              active={this.state.selectedOption}
              onChange={this.onTextSelectChange} />
          </div>
        <div className="header-subsection">
          <a className={this.state.highLightedIdx === 1 ? 'highlighted' : '' } onClick={() => this.handleClick(1)}>Italian</a>
        </div>
      </div> 
    );
  }
}

export default FilterNavBar;

