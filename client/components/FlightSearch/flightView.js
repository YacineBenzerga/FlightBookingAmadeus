import React from 'react';
import { connect } from 'react-redux';
import {
  selectedDepFlight,
  selectedRetFlight
} from '../../store/reducers/flight';

const xxx = {
  type: 'flight-offer',
  id: '1563763264773-1877884129',
  offerItems: [
    {
      services: [
        {
          segments: [
            {
              flightSegment: {
                departure: {
                  iataCode: 'EWR',
                  terminal: 'C',
                  at: '2019-08-02T13:00:00-04:00'
                },
                arrival: {
                  iataCode: 'LAX',
                  terminal: '7',
                  at: '2019-08-02T15:44:00-07:00'
                },
                carrierCode: 'UA',
                number: '2023',
                aircraft: {
                  code: '752'
                },
                operating: {
                  carrierCode: 'UA',
                  number: '2023'
                },
                duration: '0DT5H44M'
              },
              pricingDetailPerAdult: {
                travelClass: 'ECONOMY',
                fareClass: 'S',
                availability: 9,
                fareBasis: 'SAA7AQDN'
              }
            }
          ]
        }
      ],
      price: {
        total: '269.61',
        totalTaxes: '30.61'
      },
      pricePerAdult: {
        total: '269.61',
        totalTaxes: '30.61'
      }
    }
  ]
};

class FlightView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const flt = xxx.offerItems[0];
    const fltDetail1 = flt.services[0].segments[0];
    const fltDetail2 = flt.services[0].segments[1];
    const duration = fltDetail1.flightSegment.duration.split('T')[1];
    var ttPrice = Number(flt.price.total) + Number(flt.price.totalTaxes);
    const departLoc = fltDetail1.flightSegment.departure.iataCode;
    const arrivLoc = fltDetail2
      ? fltDetail2.flightSegment.arrival.iataCode
      : fltDetail1.flightSegment.arrival.iataCode;
    const stopLoc = fltDetail2
      ? '1 stop ' + fltDetail1.flightSegment.arrival.iataCode
      : 'non stop';

    //flight time(3:00pm - 5:54pm)   duration(5h 54m)(Nonstop)                Price($385) Button(Select)
    //CareerLogo (Career)            EWR-SFO                                  roundtrip

    var totalPriceTax = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(ttPrice);

    /* if (this.props.ns === 1) {
      this.props.selectDepF(this.props.flt);
    } else if (this.props.ns === 2) {
      this.props.selectRetF(this.props.flt);
    } */

    return (
      <div key={flt.id} className="flight-view">
        <div className="flt-detail1">
          <label>
            {fltDetail1.flightSegment.departure.at.split('T')[1].split('-')[0]}
          </label>
          <label>{duration}</label>
          <label />
        </div>
        <div className="flt-detail2">
          <label>
            {departLoc} - {arrivLoc}
          </label>
          <label>{stopLoc}</label>
        </div>
        <div className="flt-detail3">
          <label>{totalPriceTax}</label>
          <button
            id={JSON.stringify(flt)}
            onClick={this.props.handleSelect}
            className="w3-button w3-pale-green"
          >
            Select
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(FlightView);
