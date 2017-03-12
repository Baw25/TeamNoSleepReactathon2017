import React,{Component} from 'react';

class Button extends Component {
  state = {
    isShowingModal: false
  }
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})

  render(){
      return (
        <a onClick={this.handleClick}>
          <span>Button Text</span>
          {
            this.state.isShowingModal &&
            <ModalComponentHere onClose={this.handleClose}/>
          }
        </a>;
    );
  }
}
