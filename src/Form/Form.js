import React, { Component } from 'react';

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      place: '',
      longitude: '',
      latitude: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      place: '',
      longitude: '',
      latitude: '',
    });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="place">Place: </label>
          <input
            type="text"
            name="place"
            value={this.state.place}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="place">Longitude: </label>
          <input
            type="text"
            name="longitude"
            value={this.state.longitude}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="place">Latitude: </label>
          <input
            type="text"
            name="latitude"
            value={this.state.latitude}
            onChange={this.handleChange}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
