import React, { Component } from 'react';
import axios from 'axios';
import MeetupItem from './MeetupItem';

class Meetups extends Component {
  constructor() {
    super();
    this.state = {
      meetups: []
    }
  }

  // NOTE: Fires when a component renders
  componentWillMount() {
    this.getMeetups();
  }


  // NOTE: Get meetups from rest api
  getMeetups() {
    axios.get('http://localhost:3000/api/meetups')
      .then(response => {
        this.setState({meetups: response.data}, () => {
          // console.log(this.state);
        });
        // console.log(response.data);
      })
      .catch(err => console.log(err));
  }

  render(){
    const meetupItems = this.state.meetups.map((meetup, index) => {
      return(
        <MeetupItem key={meetup.id} item={meetup} />
      )
    })

    return (
      <div>
        <h1>Meetups</h1>
        <ul className="collection">
          {meetupItems}
        </ul>
      </div>
    )
  }
}

export default Meetups;
