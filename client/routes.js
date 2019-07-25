import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';

import { FlightFilter, HotelSearch, FlightView } from './components';

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={FlightFilter} />
        <Route exact path="/flights" component={FlightFilter} />
        <Route exact path="/hotels" component={HotelSearch} />
        <Route exact path="/flightView" component={FlightView} />
      </div>
    );
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
/* export default withRouter(
  connect(
    null,
    null
  )(Routes)
);
 */

export default Routes;
