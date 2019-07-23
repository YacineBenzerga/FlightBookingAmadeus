import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FlightView from './flightView';
import {
  selectedDepFlight,
  selectedRetFlight,
  fetchingFlights
} from '../../store/reducers/flight';

class FlightResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displFlights: [],
      ns: 0,
      flRec: []
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

  handleSelect = evt => {
    const dedFl = JSON.parse(evt.target.id);
    this.setState({
      ns: this.state.ns + 1
    });
    this.props.handleGetNs(dedFl);
  };

  rendW = () => {
    const { displFlights, ns } = this.state;
    if (fetchingFlights === true) {
      return <div>Loading</div>;
    } else if (ns === 0 && displFlights.length > 0) {
      return <div>Select departing flight</div>;
    } else if (ns === 1) {
      return <div>Select returning flight</div>;
    } else {
      return <div />;
    }
  };

  render() {
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
              ns={this.state.ns}
              flt={flt}
              key={flt.id}
              handleSelect={this.handleSelect}
              isOpen={true}
              flType={false}
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

const mapDispatchToProps = dispatch => ({
  selectDepF: flight => dispatch(selectedDepFlight(flight)),
  selectRetF: flight => dispatch(selectedRetFlight(flight))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightResults);
