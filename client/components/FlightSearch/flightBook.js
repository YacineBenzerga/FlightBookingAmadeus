import React from 'react';
import FlightView from './flightView';

class FlightBook extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    var [flt1, flt2] = [...this.props.flRec];

    var ttP =
      Number(flt1.price.total) +
      Number(flt1.price.totalTaxes) +
      Number(flt2.price.total) +
      Number(flt2.price.totalTaxes);

    var ttPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(ttP);
    return (
      <div className="main-review-trip">
        <div>
          <label
            style={{
              color: '#1b398c',
              fontSize: 'medium'
            }}
          >
            <b>Review your trip</b>
          </label>
          <div className="selected-flights">
            {this.props.flRec.map(flt => (
              <FlightView
                flt={flt}
                key={Math.random()}
                isOpen={false}
                flType={true}
              />
            ))}
          </div>
        </div>
        <div className="important-info-flight">
          <label
            style={{
              fontSize: '25px',
              color: 'black'
            }}
          >
            Trip summary
          </label>
          <label fontSize="15px">
            Trip total: <b>{ttPrice}</b>
          </label>
          <label
            style={{
              color: 'red'
            }}
          >
            Only 3 tickets left at this price!
          </label>
          <small>Rates are quoted in US dollars</small>
          <div>
            <b>Important Flight Information</b>
            <p>
              Your flight is a combination of two one-way fares, each subject to
              its own rules and restrictions. If one of your flights is changed
              or cancelled, it will not automatically alter the other flight.
              Changes to the other flight may incur a charge.
            </p>
            <label>Departure</label>
            <div>
              <ol>
                <li>
                  Tickets are refundable. A fee of $600.00 per ticket is charged
                  for itinerary cancellations. A fee of $250.00 per ticket is
                  charged for itinerary changes.
                </li>
                <li>
                  Fare Rules and Restrictions:
                  <ol>
                    <li>Choose your seat</li>
                    <li>Bring a carry-on bag</li>
                    <li>Bring a checked bag for free</li>
                    <li>Bring a 2nd checked bag for free</li>
                    <li>No refund 24 hours after booking</li>
                    <li>Pay a fee to change</li>
                    <li>Bring a personal item</li>
                    <li>Get standard boarding</li>
                  </ol>
                </li>
              </ol>
            </div>
            <label>Return</label>
            <ol>
              <li>
                <b>Tickets are refundable</b>. A fee of ¥6,000 per ticket is
                charged for itinerary cancellations.
              </li>
              <li>
                Visit EVA Airways for additional information about seats, bags,
                and other restrictions.
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default FlightBook;
