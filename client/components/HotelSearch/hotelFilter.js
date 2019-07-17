import React from 'react';
import { majCities, UScities } from '../../utils';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import { connect } from 'react-redux';
import { getHotels, selectedHotels } from '../../store/reducers/hotel';

class HotelSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      city: 'New York'
    };
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  async SearchHotels(evt) {
    evt.preventDefault();
    let { city } = this.state;
    var hotList = await this.props.searchHotels(UScities[city]);
    this.setState({});
  }

  render() {
    return (
      <div>
        <form>
          <label>Select City</label>
          <select
            name="cityS"
            onChange={this.handleChange}
            value={this.state.city}
          >
            <option>Select a city</option>
            {majCities.map(cty => {
              return (
                <option key={cty} value={cty}>
                  {cty}
                </option>
              );
            })}
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hotels: state.hotel.allHotels
});

const mapDispatchToProps = dispatch => ({
  searchHotels: city => dispatch(getHotels(city))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelSearch);
