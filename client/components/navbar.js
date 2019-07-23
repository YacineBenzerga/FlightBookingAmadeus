import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FlightFilter, HotelSearch } from './index';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="w3-bar w3-white w3-border-bottom w3-xlarge">
          <a
            href="/flights"
            className="w3-bar-item w3-button w3-text-red w3-hover-red"
          >
            <b>
              <i className="fa fa-map-marker w3-margin-right" />
              TravelCompanion
            </b>
          </a>
        </div>
        <div>
          <header>
            {/* <img
              className="w3-image"
              src="traveler.jpg"
              alt="London"
              width="1500"
              height="700"
            />  */}

            <div className="topnav">
              <a className="active">
                <Link to="/flights">Flights</Link>
              </a>
              <a>
                <Link to="/hotels">Hotels</Link>
              </a>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default Navbar;
