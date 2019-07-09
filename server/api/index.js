const router = require('express').Router();
module.exports = router;

//FlightRoutes
router.use('/searchFlights', require('./amadeus/flights'));

//HotelRoutes
router.use('/searchHotels', require('./amadeus/hotels'));

//Error Handling
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
