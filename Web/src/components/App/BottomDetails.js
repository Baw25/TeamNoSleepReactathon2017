import React, {Component} from 'react';

// import Booking from "./Booking"
import './BottomDetails.css'

const mapper = [
  ['1',"Bar Agricole","Inventory: 40","Price: $20"],
  ['2',"Serpentine", "Inventory: 56","Price: $25"],
  ['3',"Piccino", "Inventory: 25","Price: $30"],
  ['4',"Padrecito","Inventory: 47","Price: $20"]
];

  // ['5',"Limon Rotisserie","Inventory: 6","Price: $25"]
  // ['6',"My Caterpillar","Inventory: 67","Price: $30"]

class BottomDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div className="OrderBackground">
        <div className="OrderContainers">
          {mapper.map((pic) => {
            return (
              <div>
                <div className={`OrderItem${pic[0]} orders`}></div>
                <strong><p className='pic-descriptions'>{pic[1]}</p></strong>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BottomDetails;

// const styles = {


// }
