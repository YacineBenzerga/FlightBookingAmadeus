import React from 'react';

const FltViewBook = props => {
  const flt = props.flt;
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
  var totalPriceTax = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(ttPrice);

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
    </div>
  );
};

export default FltViewBook;
