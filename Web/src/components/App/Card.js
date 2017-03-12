import React from 'react';
import './card.css';
import View from './view';

//resturant schema
//address: string
//address2: string
// city: string
// country: string
// dollars: string
// latitude:
// longitude:
// name:
// options:
// phone_number:
// postal_code:
// profile_url:
// reservation_url:
// vibe:

class Card extends React.Component {
  constructor() {
    super();
  
    this.state = {
      show: true
    };
  }

  render() {
    const {
      address,
      city,
      dollars,
      name,
      phone_number,
      vibe,
      options,
      src
    } = this.props.rest
    let Julian;
    if (name === 'Thirsty Bear') {
      Julian = src
    }
    return (
      <div className={`Card ${vibe} ${this.state.show ? 'show' : ''}`}>
        <div className="card-header">
          <View name={name}/>
          <p>{name}</p>
          <span>{dollars}</span>
        </div>
        <div className="card-body-container">
          <div className="card-img">
            <img src={ Julian || `https://source.unsplash.com/${src}`}/>
          </div>
          <div className="card-body">
            <div className="vibe">
              <span><p>{vibe}</p><p>{options}</p></span>
            </div>
            <div className="address">
              <span><p>Address:</p><p>{address}</p></span>
            </div>
            <div className="phone_number">
              <span><p>Phone Number:</p><p>{phone_number}</p></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;