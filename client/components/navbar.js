import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = () => (
  <header>
    <div>
      <div>
        <div className="headline">
          <h2>Travel more Plan less</h2>
        </div>
        <nav>
          <ul className="topnav">
            <li>
              <img src="https://img.icons8.com/nolan/64/000000/airport.png" />
            </li>
            <li>
              <a href="/flights">Flights</a>
            </li>
            <li>
              <a href="/hotels">Hotels</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

export default Navbar;
