import React from 'react';
import FlightView from './flightView';

class FlightBook extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log('flrec here', this.props);
    return (
      <div>
        {this.props.flRec.map(flt => (
          <FlightView
            flt={flt}
            key={Math.random()}
            isOpen={false}
            flType={true}
          />
        ))}
      </div>
    );
  }
}

export default FlightBook;
