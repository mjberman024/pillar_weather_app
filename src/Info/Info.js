import React, { Component } from 'react';
import { connect } from 'react-redux';

class Info extends Component {
  render() {
    return this.props.place || this.props.longitude ? (
      <div>
        {this.props.place ? (
          <p>Place: {this.props.place}</p>
        ) : (
          <div>
            <p>Longitude: {this.props.longitude}</p>
            <p>Latitude: {this.props.latitude}</p>
          </div>
        )}
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
  };
};

export default connect(mapStateToProps)(Info);
