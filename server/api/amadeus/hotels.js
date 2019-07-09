const router = require('express').Router();
const utils = require('../errorHandler');
const amadeus = utils.amadeus;
const defaultHandler = utils.defaultHandler;

//Search hotels in city with cityIata code
router.get(
  '/:cityIata',
  defaultHandler(async (req, res, next) => {
    const hotels = await amadeus.shopping.hotelOffers.get({
      cityCode: req.params.cityIata
    });
    res.json(hotels.data);
  })
);

module.exports = router;
