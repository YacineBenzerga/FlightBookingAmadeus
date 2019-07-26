import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { allHotels } from '../../store/reducers/hotel';
import HotelView from './hotelView';
import _ from 'lodash';
import ReactLoading from 'react-loading';

class HotelResults extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { hotels, isFetching } = this.props;
    const priceSorted = _.sortBy(hotels, [
      x => Number(x.offers[0].price.total)
    ]);

    const divSt = {
      color: '#1b398c',
      fontSize: '25px',
      fontWeight: 'bold'
    };
    return (
      <div>
        {isFetching ? (
          <div>
            <div className="isFetchingHotel">
              {/* <label style={divSt}>Finding best deals</label> */}
              <div className="loading">
                <ReactLoading
                  type={'bars'}
                  color={'#1b398c'}
                  height={'10px'}
                  width={'80px'}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {priceSorted.map(htl => (
              <HotelView htl={htl} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hotels: state.hotel.allHotels,
  isFetching: state.hotel.isFetching
});

export default connect(
  mapStateToProps,
  null
)(HotelResults);
