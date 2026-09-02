const router = require ('express'). Router();

const { getAll, getById, create, edit, remove } = require('../../controllers/category.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');

router.get('/', getAll);
router.get('/:categoryId', getById)
router.post('/', verifyToken ,create)
router.put('/:categoryId', verifyToken, edit)
router.delete('/:categoryId', verifyToken, remove)

module.exports = router