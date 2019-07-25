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
      states,
      isOpen: !this.state.isOpen
    });
  };

  renderSelectionValue = () => {
    return (
      <div className="date-select" onClick={this.onToggle}>
        <div>
          <small>Departing:</small>
          <label>
            <i className="fas fa-calendar-alt" />
            {this.state.value.start.format('MM/DD/YYYY')}
          </label>
        </div>
        <div>
          <small>Returning:</small>
          <label>
            <i className="fas fa-calendar-alt" />
            {this.state.value.end.format('MM/DD/YYYY')}
          </label>
        </div>
      </div>
    );
  };

  handleReset = () => {
    this.onToggle();
    this.props.resetFlights();
    this.setState({
      Departing: '',
      Returning: '',
      OriginLoc: '',
      DestinLoc: '',
      value: moment.range(moment(), moment().add(7, 'days'))
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
    const { OriginLoc, DestinLoc, Departing, Returning } = this.state;
    return (
      <div className="flight-container">
        {this.state.ns === 2 ? (
          <div>
            <FlightBook flRec={this.state.flRec} />
          </div>
        ) : (
          <div>
            <h3>Travel the world with us</h3>
            <div className="form-container">
              <form
                className="flight-form"
                style={{ margin: '0 -16pxs' }}
                onSubmit={this.SearchFlights}
              >
                <div className="select-container">
                  <i className="fas fa-map-marker-alt" />
                  <select
                    name="OriginLoc"
                    onChange={this.handleChange}
                    value={this.state.OriginLoc}
                    className="selectFlight"
                  >
                    <option value="" disabled selected>
                      Flying from
                    </option>
                    {majCities.map(stt => {
                      return (
                        <option key={stt} value={stt}>
                          {stt}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="select-container">
                  <i className="fas fa-map-marker-alt" />
                  <select
                    name="DestinLoc"
                    onChange={this.handleChange}
                    value={this.state.DestinLoc}
                    className="selectFlight"
                    disabled={!OriginLoc}
                  >
                    <option value="" disabled selected>
                      Flying to
                    </option>
                    {majCities.map(stt => {
                      return (
                        <option key={stt} value={stt}>
                          {stt}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div style={{ width: '30%' }}>
                  <div>{this.renderSelectionValue()}</div>
                  {this.state.isOpen && (
                    <DateRangePicker
                      value={this.state.value}
                      onSelect={this.onSelect}
                      singleDateRange={true}
                      minimumDate={moment()}
                    />
                  )}
                </div>
                <div
                /* style={{
                    width: '15%'
                  }} */
                >
                  <p style={{ backgroundColor: 'white' }}>
                    <i className="fas fa-search" />
                    <button
                      className="w3-button w3-white"
                      type="submit"
                      onClick={this.SearchFlights}
                      disabled={
                        !(Departing && Returning && OriginLoc && DestinLoc)
                      }
                    >
                      Find Flights
                    </button>
                  </p>
                </div>
                <div>
                  <p style={{ backgroundColor: 'white' }}>
                    <i className="fas fa-trash-alt" />
                    <button
                      className="w3-button w3-white"
                      type="reset"
                      onClick={this.handleReset}
                    >
                      Reset
                    </button>
                  </p>
                </div>
              </form>
            </div>
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
