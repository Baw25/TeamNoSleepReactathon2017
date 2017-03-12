  import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import './searchbar.css';

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

// const names = function(){
//   this.props.grabData(this.props.datatype);
// }

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  // right here
  return names.filter(name => regex.test(name));
}

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => suggestion;
const renderInputComponent = inputProps => (
  <div className="inputContainer">
    <img className="icon" src="https://brand.opentable.com/wp-content/uploads/2015/03/OTLogo_rationalizationhor-r1c-01.png" />
    <input {...inputProps} />
  </div>
);

class SearchBars extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };    
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Food Preferences",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent} />
    );
  }
}

export default SearchBars;
