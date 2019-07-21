import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { FlightFilter, HotelSearch } from './index';

const styles = theme => ({
  root: {
    width: 500
  }
});

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
  }

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  handleChangeTabIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { value } = this.state;
    const { theme } = this.props;
    return (
      <div>
        <div className="w3-bar w3-white w3-border-bottom w3-xlarge">
          <a
            href="/"
            className="w3-bar-item w3-button w3-text-red w3-hover-red"
          >
            <b>
              <i className="fa fa-map-marker w3-margin-right" />
              TravelCompanion
            </b>
          </a>
        </div>
        <div /* className="navbar-container" */>
          <header>
            <div>
              <div className="w3-display-middle" style={{ width: '75%' }}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={this.handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                  >
                    <Tab label="Flights" />
                    <Tab label="Hotels" />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={this.state.value}
                  onChangeIndex={this.handleChangeIndex}
                >
                  <TabContainer dir={theme.direction}>
                    <FlightFilter />
                  </TabContainer>
                  <TabContainer dir={theme.direction}>
                    <HotelSearch />
                  </TabContainer>
                </SwipeableViews>
              </div>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Navbar);
