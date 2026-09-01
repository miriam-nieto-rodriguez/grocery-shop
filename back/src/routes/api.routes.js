const router = require('express').Router();

router.use('/products', require('./api/products.routes'));
router.use('/categories', require('./api/category.routes'));

module.exports = router