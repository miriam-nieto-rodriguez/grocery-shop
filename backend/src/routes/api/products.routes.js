const router = require ('express'). Router();

const productSchema = require('../../../schemas/product.schema');
const { getAll, getById, create, edit, remove, assignCategories } = require('../../controllers/product.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');
const validateSchema = require('../../middlewares/validation.middleware');

router.get('/', getAll);
router.get('/:productId', getById)
router.post('/', verifyToken, validateSchema(productSchema) ,create)
router.post('/:productId/categories', verifyToken,assignCategories)
router.put('/:productId', verifyToken, validateSchema(productSchema),edit)
router.delete('/:productId', verifyToken, remove)

module.exports = router;