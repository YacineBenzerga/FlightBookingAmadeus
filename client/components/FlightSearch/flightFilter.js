import React from 'react';
import { majCities, UScities } from '../../utils';
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment';
import 'react-daterange-picker/dist/css/react-calendar.css';
import {
  getDepFlights,
  getRetFlights,
  resetAllFlights
} from '../../store/reducers/flight';
import { connect } from 'react-redux';
import FlightResults from './flightResults';
import FlightBook from './flightBook';

class FlightFilter extends React.Component {
  constructor(props) {
    super(props);
    const today = moment();

    this.state = {
      Departing: '',
      Returning: '',
      OriginLoc: '',
      DestinLoc: '',
      value: moment.range(today.clone(), today.clone().add(7, 'days')),
      isOpen: false,
      ns: 0,
      flRec: []
    };
    this.SearchFlights = this.SearchFlights.bind(this);
  }

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleChangeDepart = date => {
    this.setState({
      Departing: date
    });
  };

  handleChangeReturn = date => {
    this.setState({
      Returning: date
    });
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  onSelect = (value, states) => {
    this.setState({
      value,
      Departing: moment(value.start).format('YYYY-MM-DD'),
      Returning: moment(value.end).format('YYYY-MM-DD'),
      states
    });
  };

  renderSelectionValue = () => {
    return (
      <div>
        <div>Selection</div>
        {this.state.value.start.format('YYYY-MM-DD')}
        {' - '}
        {this.state.value.end.format('YYYY-MM-DD')}
      </div>
    );
  };

  handleReset = () => {
    this.props.resetFlights();
    this.setState({
      Departing: '',
      Returning: '',
      OriginLoc: '',
      DestinLoc: '',
      value: moment.range(today.clone(), today.clone().add(7, 'days'))
    });
  };

  async SearchFlights(evt) {
    evt.preventDefault();
    let { Returning, Departing, OriginLoc, DestinLoc } = this.state;
    var depFl = await this.props.searchDepFlights(
      UScities[OriginLoc],
      UScities[DestinLoc],
      Departing
    );
    var retFl = await this.props.searchRetFlights(
      UScities[DestinLoc],
      UScities[OriginLoc],
      Returning
    );
  }

  handleGetNs = x => {
    this.setState({
      ns: this.state.ns + 1,
      flRec: [...this.state.flRec, x]
    });
  };

  render() {
    return (
      <div>
        {this.state.ns === 2 ? (
          <div>
            <FlightBook flRec={this.state.flRec} />
          </div>
        ) : (
          <div>
            <form onSubmit={this.SearchFlights}>
              <label>From?</label>
              <select
                name="OriginLoc"
                onChange={this.handleChange}
                value={this.state.OriginLoc}
              >
                <option>--</option>
                {majCities.map(stt => {
                  return (
                    <option key={stt} value={stt}>
                      {stt}
                    </option>
                  );
                })}
              </select>
              <label>To?</label>
              <select
                name="DestinLoc"
                onChange={this.handleChange}
                value={this.state.DestinLoc}
              >
                <option>--</option>
                {majCities.map(stt => {
                  return (
                    <option key={stt} value={stt}>
                      {stt}
                    </option>
                  );
                })}
              </select>
              <div>
                <input
                  type="button"
                  value="Toggle date picker"
                  onClick={this.onToggle}
                />
              </div>

              <div>{this.renderSelectionValue()}</div>
              {this.state.isOpen && (
                <DateRangePicker
                  value={this.state.value}
                  onSelect={this.onSelect}
                  singleDateRange={true}
                />
              )}
              <button type="submit" onClick={this.SearchFlights}>
                Find Flights
              </button>
              <button type="reset" onClick={this.handleReset}>
                Reset
              </button>
            </form>
            <FlightResults handleGetNs={this.handleGetNs} />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  searchDepFlights: (from, to, date) => dispatch(getDepFlights(from, to, date)),
  searchRetFlights: (from, to, date) => dispatch(getRetFlights(from, to, date)),
  resetFlights: () => dispatch(resetAllFlights())
});

export default connect(
  null,
  mapDispatchToProps
)(FlightFilter);
