import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import './card.css';

class View extends React.Component {
  state = {
    isShowingModal: false,
  }
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})
  render() {
    // const {

    // } this.props
    return <div className="here" onClick={this.handleClick}>
      {
        this.state.isShowingModal &&
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog onClose={this.handleClose}>
            <h1>Date Night is Reserved</h1>
            <p>{`your date starts at ${this.props.name}`}</p>
          </ModalDialog>
        </ModalContainer>
      }
    </div>;
  }
}

export default View;