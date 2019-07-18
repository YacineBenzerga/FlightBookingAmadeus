import React from 'react';
import FltViewBook from './fltViewBook';

class FlightBook extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.flRec.map(flt => (
          <FltViewBook flt={flt} key={Math.random()} />
        ))}
      </div>
    );
  }
}

export default FlightBook;
