import React, { Component } from 'react';
import { connect } from 'react-redux';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: this.props.data.temp,
      tempUnit: 'Farenheit',
    };
  }

  toggleTemp = () => {
    let unit = this.state.tempUnit === 'Farenheit' ? 'Celsius' : 'Farenheit';
    if (unit === 'Farenheit') {
    }
    this.setState({
      tempUnit: unit,
      temp: 0,
    });
  };
  render() {
    const tempF = 1.8 * (this.props.data.temp - 273.15) + 32;
    return (
      <div>
        <div>
          <p>Place: {this.props.place}</p>
          <p>Longitude: {this.props.longitude}</p>
          <p>Latitude: {this.props.latitude}</p>
        </div>

        <p>
          Temperature: {tempF.toFixed(1)}
          {this.state.tempUnit === 'Farenheit' ? '°F' : '°C'}
          <span>
            <button onClick={this.toggleTemp}>
              <span>{`Convert to: ${
                this.state.tempUnit === 'Farenheit' ? 'Celsius' : 'Farenheit'
              }`}</span>
            </button>
          </span>
        </p>
        <p>Humidity: {this.props.data.humidity}</p>
        <p>Pressure: {this.props.data.pressure}</p>
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
