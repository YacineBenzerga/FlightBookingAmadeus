import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const xxx = {
  type: 'hotel-offers',
  hotel: {
    type: 'hotel',
    hotelId: 'DTLAX280',
    chainCode: 'DT',
    dupeId: '700051993',
    name: 'DBLTREE BY HILTON SAN PEDRO',
    rating: '4',
    cityCode: 'LAX',
    latitude: 34.05093,
    longitude: -118.24279,
    hotelDistance: {
      distance: 0.3,
      distanceUnit: 'KM'
    },
    address: {
      lines: ['2800 VIA CABRILLO MARINA'],
      postalCode: '90731',
      cityName: 'SAN PEDRO',
      countryCode: 'US',
      stateCode: 'CA'
    },
    contact: {
      phone: '1-310-514-3344',
      fax: '1-310-514-8945'
    },
    amenities: [
      'BUSINESS_CENTER',
      'MEETING_ROOMS',
      'RESTAURANT',
      'DIS_PARKG',
      'ADAPTED_PHONES',
      'WIDE_ENTRANCE',
      'WIDE_CORRIDORS',
      'BEAUTY_PARLOUR',
      'CAR_RENTAL',
      'GIFT_SHOP',
      'JACUZZI',
      'LAUNDRY_SVC',
      'PARKING',
      'PETS_ALLOWED',
      'TENNIS',
      'HAIRDRESSER',
      'SWIMMING_POOL',
      'AIR_CONDITIONING',
      'HAIR_DRYER',
      'MOVIE_CHANNELS',
      'NONSMOKING_RMS',
      'PC_HOOKUP_INRM',
      'PHONE-DIR_DIAL',
      'TELEVISION',
      'FIRST_AID_STAF',
      'INT_ROOM_ENTRY',
      'EMERG_LIGHTING',
      'FIRE_DETECTORS',
      'EXTINGUISHERS',
      'FIRE_SAFETY',
      'GUARDED_PARKG',
      'RESTRIC_RM_ACC',
      'SAFE_DEP_BOX',
      'SMOKE_DETECTOR',
      'SPRINKLERS',
      'FITNESS_CENTER'
    ],
    media: [
      {
        uri:
          'http://pdt.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/831996022464419AA431E7CA0C72712B',
        category: 'EXTERIOR'
      }
    ]
  },
  available: true,
  offers: [
    {
      id: '4EB722478C864E49E3CD5E154D79C43502448F3ACA86891FF35949E9B8FEC4A8',
      rateCode: 'RAC',
      rateFamilyEstimated: {
        code: 'BAR',
        type: 'P'
      },
      commission: {
        percentage: '10.00'
      },
      room: {
        type: 'B1K',
        typeEstimated: {
          category: 'STANDARD_ROOM',
          beds: 1,
          bedType: 'KING'
        },
        description: {
          lang: 'EN',
          text:
            'FLEXIBLE RATE\n1 KING BED GUEST ROOM\nSWEET DREAMS EXPERIENCE BED'
        }
      },
      guests: {
        adults: 1
      },
      price: {
        currency: 'USD',
        base: '246.00',
        total: '284.62',
        taxes: [
          {
            code: 'TOTAL_TAX',
            amount: '38.62',
            included: true
          }
        ],
        variations: {
          average: {
            base: '246.00'
          },
          changes: [
            {
              startDate: '2019-07-25',
              endDate: '2019-07-26',
              base: '246.00'
            }
          ]
        }
      },
      policies: {
        cancellation: {
          deadline: '2019-07-23T12:00:00'
        }
      }
    }
  ],
  self:
    'https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=DTLAX280'
};

class HotelView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    /*   const htl = xxx;
    const htlOffers = htl.offers[0]; */
    const htl = this.props.htl.hotel;
    const htlOffers = this.props.htl.offers[0];
    var totPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(htlOffers.price.total);
    return (
      <div key={htl.id} className="flight-view">
        <div className="htl-detail1">
          <label
            style={{
              color: '#1b398c',
              fontSize: '20px',
              fontWeight: 'bold'
            }}
          >
            {htl.name}
          </label>
          {/*  <label>{htl.cityName}</label> */}
        </div>

        <label
          style={{
            color: '#1b398c',
            fontSize: '14 px',
            fontWeight: 'bold'
          }}
        >
          {htl.rating}/5 stars
        </label>
        <div>
          <label
            style={{
              color: '#1b398c',
              fontSize: '20px',
              fontWeight: 'bold'
            }}
          >
            {totPrice}
          </label>
          <small>per night</small>
        </div>
        <div style={{ margin: '10px solid transparent' }}>
          <button
            /*  onClick={this.props.handleSelect} */
            className="w3-button w3-yellow"
          >
            Select
          </button>
        </div>
        {/* <div>{htlOffers.room.typeEstimated.category}</div>
        <div>{htlOffers.room.typeEstimated.bedType}</div> */}
      </div>
    );
  }
}

export default connect(
  null,
  null
)(HotelView);
