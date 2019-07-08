const router = require('express').Router();
module.exports = router;

//put amadeus router here
/* router.use('/amadeus', require('./amadeus')) */

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
