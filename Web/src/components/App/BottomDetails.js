import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Card from './Card.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import View from './view.js';

// import Booking from "./Booking"
import './BottomDetails.css'
import './imgSrc.css';

const mapper = [
  ['1',"Bar Agricole","Californian | SOMA","Booked 32 times"],
  ['2',"Serpentine", "Contemporary American","Booked 23 times"],
  ['3',"Piccino", "Californian","Booked 46 times"],
  ['4',"Padrecito","Mexican | Cole Valley","Booked 54 times"]
];

  // ['5',"Limon Rotisserie","Inventory: 6","Price: $25"]
  // ['6',"My Caterpillar","Inventory: 67","Price: $30"]

class BottomDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      rating: 4,
      list: []
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ list: nextProps.selections.list })
  }

  render(){
    const {
      options,
      vibe,
      dollars,
      list 
    } = this.props.selections;

    const { rating } = this.state;
    return (
      <div className="OrderBackground">
          <div className="OrderContainers">
            <ReactCSSTransitionGroup
              className="OrderContainers"
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              {this.state.list.length >= 1 ? this.state.list.map((rest) => <Card rest={rest} show={true}/>) : <img className="backimg" src='src/assets/groups.png'/>}
            </ReactCSSTransitionGroup>
          </div>
      </div>
    );
  }
}

export default BottomDetails;

// const styles = {
          // {mapper.map((pic) => {
          //   return (
          //     <div>
          //       <div className={`OrderItem${pic[0]} orders`}></div>
          //       <strong><p className='pic-descriptions'>{pic[1]}</p></strong>
          //       <StarRatingComponent 
          //           name="rate1" 
          //           starCount={5}
          //           value={rating}
          //           onStarClick={this.onStarClick.bind(this)} />
          //       <p className='food-type'>{pic[2]}</p>
          //       <p className='book-type'>{pic[3]}</p>
          //     </div>
          //   );
          // })}
// }
