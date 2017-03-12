// src/components/App/index.js
import React, { Component } from 'react';
import Homepage from '../Homepage';
import logo from './logo.svg';
import './style.css';

class App extends Component {

  render() {
    const webpage = this.props.children ? React.cloneElement(this.props.children,
        this.props) : <Homepage {... this.props} />;

    return (
      <div className="App">
          <div className="Search">
            hello
          </div>
          { webpage }
      </div>
    );
  }
}

export default App;
