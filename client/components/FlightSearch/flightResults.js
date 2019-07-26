import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FlightView from './flightView';
import {
  selectedDepFlight,
  selectedRetFlight
} from '../../store/reducers/flight';
import ReactLoading from 'react-loading';

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
    const divSt = {
      color: '#1b398c',
      fontSize: '25px',
      fontWeight: 'bold'
    };
    const { displFlights, ns } = this.state;
    const isFetching = this.props.isFetching;

    if (isFetching === true) {
      return (
        <div>
          <label style={divSt}>Finding cheapest prices</label>
          <div className="loading">
            <ReactLoading
              type={'bars'}
              color={'#1b398c'}
              height={'10px'}
              width={'80px'}
            />
          </div>
        </div>
      );
    } else if (ns === 0 && displFlights.length > 0) {
      return (
        <div style={divSt}>
          Select your departure to {this.props.fltInfo.des}
        </div>
      );
    } else if (ns === 1) {
      return (
        <div style={divSt}>Select your return to {this.props.fltInfo.dpt}</div>
      );
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
        <div>
          <div className="isFetchingFlight">{this.rendW()}</div>
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
  retFlights: state.flight.retFlights,
  isFetching: state.flight.isFetching
});

const mapDispatchToProps = dispatch => ({
  selectDepF: flight => dispatch(selectedDepFlight(flight)),
  selectRetF: flight => dispatch(selectedRetFlight(flight))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightResults);
