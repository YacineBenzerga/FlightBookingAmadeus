import React from 'react';
import { connect } from 'react-redux';
import {
  selectedDepFlight,
  selectedRetFlight
} from '../../store/reducers/flight';
import moment from 'moment';

const xxx = {
  type: 'flight-offer',
  id: '1563763264773-1561981298',
  offerItems: [
    {
      services: [
        {
          segments: [
            {
              flightSegment: {
                departure: {
                  iataCode: 'LGA',
                  terminal: 'B',
                  at: '2019-08-02T06:00:00-04:00'
                },
                arrival: {
                  iataCode: 'ORD',
                  terminal: '1',
                  at: '2019-08-02T07:25:00-05:00'
                },
                carrierCode: 'UA',
                number: '761',
                aircraft: {
                  code: '319'
                },
                operating: {
                  carrierCode: 'UA',
                  number: '761'
                },
                duration: '0DT2H25M'
              },
              pricingDetailPerAdult: {
                travelClass: 'ECONOMY',
                fareClass: 'W',
                availability: 9,
                fareBasis: 'WAA7AQDN'
              }
            },
            {
              flightSegment: {
                departure: {
                  iataCode: 'ORD',
                  terminal: '1',
                  at: '2019-08-02T08:05:00-05:00'
                },
                arrival: {
                  iataCode: 'LAX',
                  terminal: '7',
                  at: '2019-08-02T10:38:00-07:00'
                },
                carrierCode: 'UA',
                number: '204',
                aircraft: {
                  code: '753'
                },
                operating: {
                  carrierCode: 'UA',
                  number: '204'
                },
                duration: '0DT4H33M'
              },
              pricingDetailPerAdult: {
                travelClass: 'ECONOMY',
                fareClass: 'W',
                availability: 9,
                fareBasis: 'WAA7AQDN'
              }
            }
          ]
        }
      ],
      price: {
        total: '304.19',
        totalTaxes: '40.19'
      },
      pricePerAdult: {
        total: '304.19',
        totalTaxes: '40.19'
      }
    }
  ]
};

var humanizeDur = (str1, str2, type) => {
  var hh1 = Number(str1.split('H')[0]);
  var mn1 = Number(str1.split('H')[1].split('M')[0]);
  var hh2 = Number(str2.split('H')[0]);
  var mn2 = Number(str2.split('H')[1].split('M')[0]);
  var resH = 0;
  var resM = mn1 + mn2;
  if (resM >= 60) {
    resH = Math.floor((mn1 + mn2) / 60);
    resM = Math.floor((mn1 + mn2) % 60);
  }
  const obj = { minutes: resM, hours: hh1 + hh2 + resH };

  return obj;
};

var durFix = str1 => {
  var hh1 = Number(str1.split('H')[0]);
  var mn1 = Number(str1.split('H')[1].split('M')[0]);
  const obj = { minutes: mn1, hours: hh1 };
  return obj;
};

class FlightView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const flt = xxx.offerItems[0];
    const fltDetail1 = flt.services[0].segments[0];
    const fltDetail2 = flt.services[0].segments[1];
    var ttPrice = Number(flt.price.total) + Number(flt.price.totalTaxes);
    const departLoc = fltDetail1.flightSegment.departure.iataCode;
    const arrivLoc = fltDetail2
      ? fltDetail2.flightSegment.arrival.iataCode
      : fltDetail1.flightSegment.arrival.iataCode;
    const stopLoc = fltDetail2
      ? '1 stop ' + fltDetail1.flightSegment.arrival.iataCode
      : 'non stop';

    const availability = fltDetail1.pricingDetailPerAdult.availability;
    const departTime = moment(
      fltDetail1.flightSegment.departure.at /* .split('T')[1].split('-')[0] */
    ).format('hh:mma');
    var duration = 's';
    if (fltDetail2) {
      const resDur = humanizeDur(
        fltDetail1.flightSegment.duration.split('T')[1],
        fltDetail2.flightSegment.duration.split('T')[1]
      );
      var duration = `${resDur.hours}h ${resDur.minutes}m`;
    } else {
      var duration = fltDetail1.flightSegment.duration.split('T')[1];
    }
    const arrivalTime = moment(departTimes)
      .add(duration.hours, 'hours')
      .add(duration.minutes, 'minutes')
      .format('hh:mma');
    //flight time(3:00pm - 5:54pm)   duration(5h 54m)(Nonstop)                Price($385) Button(Select)
    //CareerLogo (Career)            EWR-SFO                                  roundtrip

    var totalPriceTax = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(ttPrice);

    /* if (this.props.ns === 1) {
      this.props.selectDepF(this.props.flt);
    } else if (this.props.ns === 2)
      this.props.selectRetF(this.props.flt);
    } */

    return (
      <div key={flt.id} className="flight-view">
        <div className="flt-detail1">
          <label>{departTime}</label>
          <label>{duration}</label>
          <label>{arrivalTime}</label>
          <label />
        </div>
        <div className="flt-detail2">
          <label>
            {departLoc} -> {stopLoc} -> {arrivLoc}
          </label>
        </div>
        <div className="flt-detail3">
          <label style={{ color: 'red' }}>
            {availability} left at <b>{totalPriceTax}</b>
          </label>
          <div style={{ margin: '10px solid transparent' }}>
            <button
              id={JSON.stringify(flt)}
              onClick={this.props.handleSelect}
              className="w3-button w3-yellow"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(FlightView);
