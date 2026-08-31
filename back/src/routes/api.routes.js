const router = require('express').Router();

router.use('/products', require('./api/products.routes'));

module.exports = router