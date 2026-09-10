const router = require ('express'). Router();

const categorySchema = require('../../../schemas/category.schema');
const { getAll, getById, create, edit, remove } = require('../../controllers/category.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');
const validateSchema = require('../../middlewares/validation.middleware');

router.get('/', getAll);
router.get('/:categoryId', getById)
router.post('/', verifyToken, validateSchema(categorySchema),create)
router.put('/:categoryId', verifyToken, validateSchema(categorySchema),edit)
router.delete('/:categoryId', verifyToken, remove)

module.exports = router