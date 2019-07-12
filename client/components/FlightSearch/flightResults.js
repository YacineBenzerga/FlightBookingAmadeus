import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FlightView from './flightView';

const FlightResults = props => {
  const allFlights = props.flights.slice(0, 10);
  const priceSorted = _.sortBy(allFlights, [
    x => Number(x.offerItems[0].price.total)
  ]);

  return (
    <div className="flightResults">
      {priceSorted.map(flt => (
        <FlightView flt={flt} key={flt.id} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  flights: state.flight.depFlights
});

export default connect(
  mapStateToProps,
  null
)(FlightResults);
