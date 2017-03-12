import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactSpinner from 'react-spinjs';
import './modal.css';

class ActualModal extends React.Component {
  static propTypes = {
    isLoading: false,
  }
  state = {
    isShowingModal: false,
  }
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})

  render() {
     const {
        props: {
          isLoading,
        },
      } = this;

    return(
      <button onClick={this.handleClick}>
        Click Me
        {
          this.state.isShowingModal &&
        <ModalContainer onClose={this.handleClose}>
            {
            isLoading ? <ReactSpinner /> :
            <ModalDialog onClose={this.handleClose}>
              <h1>Order Confirmed!</h1>
              <p>More Content. Anything goes here</p>
            </ModalDialog>
          }
        </ModalContainer>
        }
      </button>
    );
  }
}
// https://brand.opentable.com/wp-content/themes/opentable/assets/images/otlogoreg.png
const styles = {

}

export default ActualModal;



