import React, { Component } from 'react';

import {
  getWeatherDataUsingPlace,
  getWeatherDataUsingLatandLong,
  getWeatherDataUsingZip,
} from '../store';
import { connect } from 'react-redux';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      place: '',
      longitude: '',
      latitude: '',
      zip: '',
    };
  }

  componentDidMount() {
    this.getMyLocation();
  }

  getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(position => {
        this.props.getWeatherDataLatLong({
          longitude: position.coords.longitude.toFixed(2),
          latitude: position.coords.latitude.toFixed(2),
        });
        this.setState({
          longitude: position.coords.longitude.toFixed(2),
          latitude: position.coords.latitude.toFixed(2),
        });
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (e.target.name === 'place') {
      this.props.getWeatherDataPlace(this.state.place);
    } else if (e.target.name === 'latAndLong') {
      this.props.getWeatherDataLatLong({
        longitude: this.state.longitude,
        latitude: this.state.latitude,
      });
    } else {
      this.props.getWeatherDataZip({
        zip: this.state.zip,
      });
    }
    this.setState({
      place: '',
      longitude: '',
      latitude: '',
      zip: '',
    });
  };

  render() {
    return (
      <div>
        <form name="place" onSubmit={this.handleSubmit}>
          <label htmlFor="place">Place: </label>
          <input
            type="text"
            name="place"
            value={this.state.place}
            onChange={this.handleChange}
            required={true}
          />
          <br />
          <button type="submit">Search By Place</button>
        </form>
        <br />
        <form name="zip" onSubmit={this.handleSubmit}>
          <label htmlFor="zip">Zipcode: </label>
          <input
            type="text"
            name="zip"
            value={this.state.zip}
            onChange={this.handleChange}
            required={true}
          />
          <br />
          <button type="submit">Search By zip</button>
        </form>

        <form name="latAndLong" onSubmit={this.handleSubmit}>
          <br />
          <label htmlFor="place">Longitude: </label>
          <input
            type="text"
            name="longitude"
            value={this.state.longitude}
            onChange={this.handleChange}
            required={true}
          />

          <label htmlFor="place">Latitude: </label>
          <input
            type="text"
            name="latitude"
            value={this.state.latitude}
            onChange={this.handleChange}
            required={true}
          />
          <br />
          <button type="submit">Search by Latitude and Longitude</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getWeatherDataPlace: place => dispatch(getWeatherDataUsingPlace(place)),
  getWeatherDataLatLong: latLong =>
    dispatch(getWeatherDataUsingLatandLong(latLong)),
  getWeatherDataZip: zip => dispatch(getWeatherDataUsingZip(zip)),
});

export default connect(
  null,
  mapDispatchToProps
)(Form);
