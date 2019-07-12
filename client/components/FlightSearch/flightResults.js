import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const FlightResults = props => {
  const allFlights = props.flights.slice(0, 10);
  const priceSorted = _.sortBy(allFlights, [
    x => Number(x.offerItems[0].price.total)
  ]);
  console.log(priceSorted);

  return (
    <div>
      <h2>Flights here</h2>
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
