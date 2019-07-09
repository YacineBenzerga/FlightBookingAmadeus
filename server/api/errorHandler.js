const Amadeus = require('amadeus');

const defaultHandler = asyncFunc => {
  return function(req, res, next) {
    return Promise.resolve(asyncFunc.call(this, req, res, next)).catch(err => {
      next(err);
    });
  };
};

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

module.exports = { defaultHandler, amadeus };
