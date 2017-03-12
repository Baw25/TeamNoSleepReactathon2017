// src/components/App/index.js
import React, { Component } from 'react';
import DatePicker from'react-datepicker';
import moment from'moment'
import Scroll from 'react-scroll';
import Homepage from '../Homepage';
import Header from '../Header';
import Form from '../Form';
import logo from './logo.svg';

import './style.css';
import './react-datepicker-cssmodules.css';

const scroll = Scroll.animateScroll

class App extends Component {
  constructor() {
    super();
  
    this.state = {
      date: moment()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  handleChange(date) {
    this.setState({
      date
    });
  }

  handleClick() {
    scroll.scrollTo(
      2000, 
      {duration: 2000, delay: 0, smooth: true
    })
  }

  componentDidMount() {
    this.props.fetchOpenTableListing()
    this.props.getItinerary()
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  render() {
    const webpage = this.props.children ? React.cloneElement(this.props.children,
        this.props) : <Homepage {... this.props} />;

    return (
      <div className="App">
          <div className="Search">
            {console.log(this.props)}
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
                    placeholder="Location or Restaurant"
                  />
                </div>
                  <button className="submit" onClick={this.handleClick}>
                    Search
                  </button>
              </div>
            </div>
            <section id="section04" class="demo">
              <a><span onClick={this.handleClick}></span></a>
            </section>
          </div>
            { webpage }
      </div>
    );
  }
}

export default App;
