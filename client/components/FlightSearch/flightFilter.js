import React from 'react';
import { USstates } from '../../utils';
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment';
import 'react-daterange-picker/dist/css/react-calendar.css';

class FlightFilter extends React.Component {
  constructor() {
    super();
    const today = moment();

    this.state = {
      Departing: '',
      Returning: '',
      OriginLoc: '',
      DestinLoc: '',
      value: moment.range(today.clone(), today.clone().add(7, 'days')),
      isOpen: false
    };
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
    this.setState({ value, states });
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

  render() {
    console.log(this.state);
    return (
      <div>
        <form>
          <label>From?</label>
          <select
            name="OriginLoc"
            onChange={this.handleChange}
            value={this.state.OriginLoc}
          >
            {USstates.map(stt => {
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
            {USstates.map(stt => {
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
        </form>
      </div>
    );
  }
}

export default FlightFilter;
