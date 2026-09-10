const router = require ('express'). Router();

const { getAll, getById, create } = require('../../controllers/order.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');

router.get('/', verifyToken, getAll)
router.get('/:orderId', verifyToken, getById)
router.post('/', verifyToken, create)


module.exports = router;