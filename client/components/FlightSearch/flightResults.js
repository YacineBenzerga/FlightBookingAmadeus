import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FlightView from './flightView';
import {
  selectedDepFlight,
  selectedRetFlight
} from '../../store/reducers/flight';

class FlightResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispFlights: props.depFlights,
      nSelects: 0,
      selectedDFlight: {},
      selectedRFlight: {}
    };
  }

  handleSelect = evt => {
    this.setState({
      nSelects: this.state.nSelects + 1,
      dispFlights: this.props.retFlights
    });
  };

  renFlights = () => {
    const priceSorted = _.sortBy(this.state.dispFlights.slice(0, 10), [
      x => Number(x.offerItems[0].price.total)
    ]);
    const ns = this.state.nSelects;

    if (priceSorted.length > 0) {
      return (
        <div>
          {(() => {
            switch (ns) {
              case 1:
                return (
                  <div>
                    <h1>Select Returning Flight</h1>
                    {priceSorted.map(flt => (
                      <FlightView flt={flt} key={flt.id} />
                    ))}
                  </div>
                );
              case 3:
                return (
                  <div>
                    <h1>Flights are selected</h1>
                  </div>
                );
              default:
                return (
                  <div>
                    <h1>Select Departing Flight</h1>
                    {priceSorted.map(flt => (
                      <FlightView
                        flt={flt}
                        key={flt.id}
                        handleSelect={this.handleSelect}
                      />
                    ))}
                  </div>
                );
            }
          })()}
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  };

  render() {
    return <div>{this.renFlights()}</div>;
  }
}
const mapStateToProps = state => ({
  depFlights: state.flight.depFlights,
  retFlights: state.flight.retFlights
});

export default connect(
  mapStateToProps,
  null
)(FlightResults);
