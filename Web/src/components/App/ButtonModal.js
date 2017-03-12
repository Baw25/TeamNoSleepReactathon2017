import React,{Component} from 'react';
import ActualModal from './ActualModal.js';

class ButtonModal extends Component {
  state = {
    isShowingModal: false
  }
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})

  testFunction(){
    console.log("Hey");
  }

  render(){
      return (
        <button onClick={this.handleClick}>
          <span>Button Text</span>
          {
            this.state.isShowingModal &&
            <ActualModal onClose={this.handleClose}/>
          }
        </button>
    );
  }
}

export default ButtonModal;
