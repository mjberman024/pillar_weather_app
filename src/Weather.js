import React, { Component } from 'react';
import Form from './Form/Form';
import Info from './Info/Info';

export default class Weather extends Component {
  render() {
    return (
      <div>
        <h1>Weather</h1>
        <Form />
        <Info />
      </div>
    );
  }
}
