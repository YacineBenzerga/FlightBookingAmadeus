import React from 'react';
import { connect } from 'react-redux';
import {
  selectedDepFlight,
  selectedRetFlight
} from '../../store/reducers/flight';
import moment from 'moment';
import { carrierCodes } from '../../utils';

var humanizeDur = (str1, str2) => {
  var arr1 = str1.split('H');
  var arr2 = str2.split('H');
  var hh1 = Number(arr1[0]);
  var mn1 = Number(arr1[1].split('M')[0]);
  var hh2 = Number(arr2[0]);
  var mn2 = Number(arr2[1].split('M')[0]);
  var resH = 0;
  var resM = mn1 + mn2;
  if (resM >= 60) {
    resH = Math.floor(resM / 60);
    resM = Math.floor(resM % 60);
  }
  const obj = { minutes: resM, hours: hh1 + hh2 + resH };
  return obj;
};

var durFix = str1 => {
  var arr = str1
    .trim()
    .toLowerCase()
    .split('h');
  var hh1 = Number(arr[0]);
  var mn1 = Number(arr[1].split('m')[0]);
  const obj = { minutes: mn1, hours: hh1 };
  return obj;
};

class FlightView extends React.Component {
  constructor() {
    super();
  }

  render() {
    var flt = null;
    if (this.props.flType === true) {
      var flt = this.props.flt;
    } else {
      flt = this.props.flt.offerItems[0];
    }

    const fltDetail1 = flt.services[0].segments[0];
    var fltDetail2 = null;
    if (flt.services[0].segments.length > 1) {
      var fltDetail2 = flt.services[0].segments[1];
    }

    var ttPrice = Number(flt.price.total) + Number(flt.price.totalTaxes);
    const departLoc = fltDetail1.flightSegment.departure.iataCode;
    const arrivLoc = fltDetail2
      ? fltDetail2.flightSegment.arrival.iataCode
      : fltDetail1.flightSegment.arrival.iataCode;
    const nstop = fltDetail2 ? '1 stop ' : 'non stop';

    var availability = fltDetail1.pricingDetailPerAdult.availability;
    var departTime = moment(
      fltDetail1.flightSegment.departure.at /* .split('T')[1].split('-')[0] */
    );
    var duration = '';
    if (fltDetail2) {
      const resDur = humanizeDur(
        fltDetail1.flightSegment.duration.split('T')[1],
        fltDetail2.flightSegment.duration.split('T')[1]
      );
      var duration = `${resDur.hours}h${resDur.minutes}m`;
    } else {
      var duration = fltDetail1.flightSegment.duration
        .split('T')[1]
        .toLowerCase();
    }

    var objDur = null;
    if (typeof duration === 'string') {
      var objDur = durFix(duration);
    } else {
      var objDur = duration;
    }

    var arrivalTime = moment(departTime)
      .add(objDur.hours, 'hours')
      .add(objDur.minutes, 'minutes')
      .format('hh:mma');

    var totalPriceTax = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(ttPrice);

    var carrier = carrierCodes[fltDetail1.flightSegment.carrierCode];

    /*  if (this.props.ns === 1) {
      this.props.selectDepF(this.props.flt);
    } else if (this.props.ns === 2)
      this.props.selectRetF(this.props.flt);
    } */

    return (
      <div key={flt.id} className="flight-view">
        <div className="flt-detail1">
          <label>
            {departTime.format('hh:mma')} - {arrivalTime}
          </label>
          <label>{carrier}</label>
        </div>
        <div className="flt-detail2">
          <label>{duration}</label>
          <label>({nstop})</label>
          {fltDetail2 ? (
            <label>
              {departLoc} -> {fltDetail1.flightSegment.arrival.iataCode} ->{' '}
              {arrivLoc}
            </label>
          ) : (
            <label>
              {departLoc} -> {arrivLoc}
            </label>
          )}

          <label />
        </div>
        <div className="flt-detail3">
          <label style={{ color: 'red', margin: '3px' }}>
            {availability} left at <b>{totalPriceTax}</b>
          </label>
          {this.props.isOpen && (
            <div style={{ margin: '10px solid transparent' }}>
              <button
                id={JSON.stringify(flt)}
                onClick={this.props.handleSelect}
                className="w3-button w3-yellow"
              >
                Select
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(FlightView);
