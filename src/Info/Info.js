import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

//API KEY: 82125ad85789ea94811b6f431b5e0191

class Info extends Component {
  async getData() {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${
        this.props.place
      }&APPID=82125ad85789ea94811b6f431b5e0191`
    );
    this.setState({ data: data.list[0].main });
    return data.list[0].main;
  }

  render() {
    return this.props.place || this.props.longitude ? (
      <div>
        {!this.props.longitude ? (
          <p>Place: {this.props.place}</p>
        ) : (
          <div>
            <p>Place: {this.props.place}</p>
            <p>Longitude: {this.props.longitude}</p>
            <p>Latitude: {this.props.latitude}</p>
          </div>
        )}

        <p>Temperature: {this.props.data.temp}</p>
        <p>Humidity: {this.props.data.humidity}</p>
        <p>Pressure: {this.props.data.pressure}</p>
      </div>
    ) : (
      <div> Please place a query</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    place: state.place,
    longitude: state.longitude,
    latitude: state.latitude,
    data: state.data,
  };
};

export default connect(mapStateToProps)(Info);
