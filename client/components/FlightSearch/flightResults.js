import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FlightView from './flightView';
import {
  selectedDepFlight,
  fetchingFlights
} from '../../store/reducers/flight';

class FlightResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displFlights: [],
      ns: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.depFlights !== prevProps.depFlights) {
      this.setState({
        displFlights: this.props.depFlights
      });
    }
    if (this.state.ns !== prevState.ns) {
      this.setState({
        displFlights: this.props.retFlights
      });
    }
  }

  handleSelect = () => {
    this.setState({
      ns: !this.state.ns
    });
  };

  rendW = () => {
    const { displFlights, ns } = this.state;
    if (fetchingFlights === true) {
      return <div>Loading</div>;
    } else if (ns === false && displFlights.length > 0) {
      return <div>Select departing flight</div>;
    } else if (ns === true) {
      return <div>Select returning flight</div>;
    } else {
      return <div>recommended destinations from New York City</div>;
    }
  };

  render() {
    console.log(this.state);

    const allFlights = this.state.displFlights.slice(0, 10);
    const priceSorted = _.sortBy(allFlights, [
      x => Number(x.offerItems[0].price.total)
    ]);
    return (
      <div>
        <div className="flightResults">
          {this.rendW()}
          {priceSorted.map(flt => (
            <FlightView
              flt={flt}
              key={flt.id}
              handleSelect={this.handleSelect}
            />
          ))}
        </div>
      </div>
    );
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
