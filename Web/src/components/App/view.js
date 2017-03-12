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
            <div className="datnights">
              <h1>Date Night is Reserved</h1>
              <ul>
                {didnothavetimetopassdown.schedule.map((schedule) => {
                  return (<div className='dddd'>
                    <span><h4>{schedule.name}</h4><p>{schedule.desc}</p></span>
                    <img src={schedule.img}/>
                  </div>)
                })}
              </ul>
            </div>
          </ModalDialog>
        </ModalContainer>
      }
    </div>;
  }
}

export default View;


const didnothavetimetopassdown = {
  "user" : "John Kim",
  "pair" : "Chimi Kim",
  "schedule" : [
    {
      "name" : "Travel",
      "desc" : "661 Howard St.",
      "icon" : "car",
      "img" : "https://maps.googleapis.com/maps/api/staticmap?center=ThirstyBear+Brewing+Company&markers=size:mid%7Ccolor:red%7CThirstyBear+Brewing+Company&zoom=16&size=360x360&scale=2&key=AIzaSyA16GJLXGGP7Asjy8n1TiyDD4jLsIP3XN4",
      "startTime" : 1489366800,
      "endTime" : 1489367700
    },
    {
      "name" : "Dinner",
      "desc" : "Thirsty Bear",
      "icon" : "dish",
      "img" : "http://openforbusiness.opentable.com/wp-content/uploads/2016/08/EWP2016_ThirstyBear-0366.jpg",
      "startTime" : 1489368600,
      "endTime" : 1489375800
    },
    {
      "name" : "Walk",
      "desc" : "135 4th St.",
      "icon" : "walking",
      "img" : "https://maps.googleapis.com/maps/api/staticmap?center=Metreon&markers=size:mid%7Ccolor:red%7CMetreon&zoom=15&size=360x360&scale=2&key=AIzaSyA16GJLXGGP7Asjy8n1TiyDD4jLsIP3XN4",
      "startTime" : 1489376700,
      "endTime" : 1489377600
    },
    {
      "name" : "Movie",
      "desc" : "Beauty and the Beast",
      "icon" : "tickets",
      "img" : "http://digitalspyuk.cdnds.net/16/45/768x512/gallery-1478513336-belle-and-her-father-beauty-and-the-beast.jpg",
      "startTime" : 1489378200,
      "endTime" : 1489386000
    },
    {
      "name" : "Walk",
      "desc" : "691 Market St",
      "icon" : "walking",
      "img" : "https://maps.googleapis.com/maps/api/staticmap?center=Local+Edition+-+San+Francisco&markers=size:mid%7Ccolor:red%7CLocal+Edition+-+San+Francisco&zoom=14&size=360x360&scale=2&key=AIzaSyA16GJLXGGP7Asjy8n1TiyDD4jLsIP3XN4",
      "startTime" : 1489386000,
      "endTime" : 1489386600
    },
    {
      "name" : "Adventure",
      "desc" : "Mystery Bar",
      "icon" : "cocktails",
      "img" : "http://www.bacardi.com/us/SiteImages/featured-cocktails/fc-kc-step0-bg.jpg",
      "startTime" : 1489386600,
      "endTime" : 1489395600
    }
  ]
}
