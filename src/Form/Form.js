import React, { Component } from 'react';

import {
  getWeatherDataUsingPlace,
  getWeatherDataUsingLatandLong,
} from '../store';
import { connect } from 'react-redux';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      place: '',
      longitude: '',
      latitude: '',
    };
    this.placeChange = this.placeChange.bind(this);
    this.longAndLatChange = this.longAndLatChange.bind(this);
    this.handlePlaceSubmit = this.handlePlaceSubmit.bind(this);
    this.handleLatAndLongSubmit = this.handleLatAndLongSubmit.bind(this);
  }

  placeChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  longAndLatChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handlePlaceSubmit(e) {
    e.preventDefault();
    this.props.getWeatherDataPlace(this.state.place);
    this.setState({
      place: '',
      longitude: '',
      latitude: '',
    });
  }
  async handleLatAndLongSubmit(e) {
    this.props.getWeatherDataLatLong({
      longitude: this.state.longitude,
      latitude: this.state.latitude,
    });
    e.preventDefault();
    await this.setState({
      place: '',
      longitude: '',
      latitude: '',
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handlePlaceSubmit}>
          <label htmlFor="place">Place: </label>
          <input
            type="text"
            name="place"
            value={this.state.place}
            onChange={this.placeChange}
            required={true}
          />
          <br />
          <button type="submit">Search By Place</button>
        </form>
        <form onSubmit={this.handleLatAndLongSubmit}>
          <br />
          <label htmlFor="place">Longitude: </label>
          <input
            type="text"
            name="longitude"
            value={this.state.longitude}
            onChange={this.longAndLatChange}
            required={true}
          />

          <label htmlFor="place">Latitude: </label>
          <input
            type="text"
            name="latitude"
            value={this.state.latitude}
            onChange={this.longAndLatChange}
            required={true}
          />
          <br />
          <button type="submit">Search by Latitude and Longitude</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    place: state.place,
    longitude: state.longitude,
    latitude: state.latitude,
  };
};

const mapDispatchToProps = dispatch => ({
  getWeatherDataPlace: place => dispatch(getWeatherDataUsingPlace(place)),
  getWeatherDataLatLong: latLong =>
    dispatch(getWeatherDataUsingLatandLong(latLong)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
