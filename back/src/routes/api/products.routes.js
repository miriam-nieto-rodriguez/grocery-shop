const router = require ('express'). Router();

const { getAll, getById, create, edit, remove, assignCategories } = require('../../controllers/product.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');

router.get('/', getAll);
router.get('/:productId', getById)
router.post('/', verifyToken,create)
router.post('/:productId/categories', verifyToken, assignCategories)
router.put('/:productId', verifyToken, edit)
router.delete('/:productId', verifyToken, remove)

module.exports = router;