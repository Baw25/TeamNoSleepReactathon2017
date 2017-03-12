// src/components/App/index.js
import React, { Component } from 'react';
import DatePicker from'react-datepicker';
import moment from'moment'
import Homepage from '../Homepage';
import Header from '../Header';
import Form from '../Form';
import logo from './logo.svg';
import './style.css';
import './react-datepicker-cssmodules.css';

class App extends Component {
  
  constructor() {
    super();
  
    this.state = {
      date: moment()
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      date
    });
  }

  render() {
    const webpage = this.props.children ? React.cloneElement(this.props.children,
        this.props) : <Homepage {... this.props} />;

    return (
      <div className="App">
          <div className="Search">
            <Header currentLocation="San Francisco" />
            <div className="logo">
              <img src='/src/assets/logo.png' />
            </div>
            <div className="form">
              <div className="select-date">
                <div className="cal_img">
                  <img src='/src/assets/cal2.png'/>
                </div>
                <DatePicker 
                  selected={this.state.date}
                  onChange={this.handleChange}
                />
                <div className="location">
                  <input
                    placeholder="Location..."
                  />
                </div>
                <button className="submit">
                  Search
                </button>
              </div>
            </div>
          </div>
          { webpage }
      </div>
    );
  }
}

export default App;
