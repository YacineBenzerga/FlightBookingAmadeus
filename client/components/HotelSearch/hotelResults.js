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
    this.state = {};
  }

  render() {
    const { hotels, isFetching } = this.props;
    const priceSorted = _.sortBy(hotels, [
      x => Number(x.offers[0].price.total)
    ]);

    return (
      <div>
        {isFetching ? (
          <div className="isFetchingFlight">
            <div className="loading">
              <ReactLoading
                type={'bars'}
                color={'black'}
                height={'10px'}
                width={'80px'}
              />
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
