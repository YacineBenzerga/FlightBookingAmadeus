import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class HotelView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const htl = props.htl.hotel;
    const htlOffers = props.htl.offers[0];
    var totPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(htlOffers.price.total);
    return (
      <div>
        <div>
          <label>{htl.name}</label>
        </div>
        <label>{htl.rating} stars</label>
        <div>
          <label>{totPrice}</label>
        </div>
        <div>{htlOffers.room.typeEstimated.category}</div>
        <div>{htlOffers.room.typeEstimated.bedType}</div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(HotelView);
