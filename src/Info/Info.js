import React, { Component } from 'react';
import { connect } from 'react-redux';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      tempUnit: 'Farenheit',
    };
  }

  toggleTemp = temp => {
    if (this.state.tempUnit === 'Farenheit') {
      temp = (this.props.data.temp - 273.15).toFixed(2);
    } else {
      temp = ((this.props.data.temp - 273.15) * (9 / 5) + 32).toFixed(2);
    }
    let unit = this.state.tempUnit === 'Farenheit' ? 'Celsius' : 'Farenheit';
    this.setState({
      tempUnit: unit,
      temp,
    });
  };
  render() {
    const { place, longitude, latitude } = this.props;
    const { temp, humidity, pressure } = this.props.data;

    let temperature =
      this.state.temp ||
      ((this.props.data.temp - 273.15) * (9 / 5) + 32).toFixed(2);
    return (
      <div>
        <p>Place: {place}</p>
        <p>Longitude: {longitude}</p>
        <p>Latitude: {latitude}</p>
        <p>
          Temperature: {temperature}
          {this.state.tempUnit === 'Farenheit' ? '°F' : '°C'}
          <span>
            <button onClick={() => this.toggleTemp(temp)}>
              <span>{`Convert to: ${
                this.state.tempUnit === 'Farenheit' ? 'Celsius' : 'Farenheit'
              }`}</span>
            </button>
          </span>
        </p>
        <p>Humidity: {humidity}</p>
        <p>Pressure: {pressure}</p>
      </div>
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
