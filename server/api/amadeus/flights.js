const router = require('express').Router();
const utils = require('../errorHandler');
const amadeus = utils.amadeus;
const defaultHandler = utils.defaultHandler;

//Search flight from origin to destination on date
router.get(
  '/:from-:to-:date',
  defaultHandler(async (req, res, next) => {
    const flights = await amadeus.shopping.flightOffers.get({
      origin: req.params.from,
      destination: req.params.to,
      departureDate: req.params.date
    });
    res.json(flights.data);
  })
);

//Search most traveled destinations from origin on date
router.get(
  '/frqTraveled/:from-:date',
  defaultHandler(async (req, res, next) => {
    const mostTravDest = await amadeus.travel.analytics.AirTraffic.Traveled.get(
      {
        originCityCode: req.params.from,
        period: req.params.date
      }
    );
    res.json(maxLocTrav.data);
  })
);

module.exports = router;
