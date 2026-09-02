const router = require('express').Router();

router.use('/products', require('./api/products.routes'));
router.use('/categories', require('./api/category.routes'));
router.use('/auth', require('./api/auth.routes'));

module.exports = router