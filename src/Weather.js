import React, { Component } from 'react';
import Form from './Form/Form';
import Info from './Info/Info';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';

class Weather extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <Form />
        <Info />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    place: state.place,
  };
};

export default connect(mapStateToProps)(Weather);
