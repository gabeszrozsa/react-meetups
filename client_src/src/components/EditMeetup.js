import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class EditMeetup extends Component{
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      city: '',
      address: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getMeetupDetails();
  }


  // NOTE: Get a single meetup with link ID
  getMeetupDetails() {
    let meetupId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/meetups/${meetupId}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          city: response.data.city,
          address: response.data.address,
        }, () => {
          // console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  // NOTE: Editing an input field
  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    // NOTE: Easier to add, dont have to add separate props
    this.setState({
      [name]: value
    })
  }


  // NOTE: Save new meetup
  editMeetup(newMeetup) {
    axios.request({
      method: 'put',
      url: `http://localhost:3000/api/meetups/${this.state.id}`,
      data: newMeetup
    }).then(response => {
      // redirect
      this.props.history.push();
    })
    .catch(err => console.log(err));
  }


  // NOTE: Submit form function
  onSubmit(e){
    const newMeetup = {
      name: this.refs.name.value,
      city: this.refs.city.value,
      address: this.refs.address.value
    };
    this.editMeetup(newMeetup);
    e.preventDefault();
  }


  render() {
    return(
      <div>
        <br/>
        <Link className="btn grey" to="/">Back</Link>
        <h1>Edit Meetup</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange.bind(this)} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="city" ref="city" value={this.state.city} onChange={this.handleInputChange.bind(this)} />
            <label htmlFor="city">City</label>
          </div>
          <div className="input-field">
            <input type="text" name="address" ref="address" value={this.state.address} onChange={this.handleInputChange.bind(this)} />
            <label htmlFor="address">Address</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default EditMeetup;
