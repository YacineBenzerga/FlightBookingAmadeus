import React from 'react';
import { connect } from 'react-redux';
import {
  selectedDepFlight,
  selectedRetFlight
} from '../../store/reducers/flight';

class FlightView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const flt = this.props.flt.offerItems[0];
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
      <div key={flt.id} className="flightResults">
        <ol>
          <li>
            {fltDetail1.flightSegment.departure.at.split('T')[1].split('-')[0]}
          </li>
          <li> {duration} </li>
          <li> {totalPriceTax} </li>
          <li>
            <ol>
              <li>
                {departLoc} - {arrivLoc}
              </li>
              <li>{stopLoc}</li>
            </ol>
          </li>
        </ol>
        <button id={JSON.stringify(flt)} onClick={this.props.handleSelect}>
          Select
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(FlightView);
