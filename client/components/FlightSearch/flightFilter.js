import React from 'react';
import { USstates } from '../../utils';

class FlightFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      Departing: '',
      Returning: '',
      OriginLoc: '',
      DestinLoc: ''
    };
  }

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
        </form>
      </div>
    );
  }
}

export default FlightFilter;
