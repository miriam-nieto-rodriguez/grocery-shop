const router = require ('express'). Router();

const { getAll, getById, create, edit, remove } = require('../../controllers/category.controller');

router.get('/', getAll);
router.get('/:categoryId', getById)
router.post('/', create)
router.put('/:categoryId', edit)
router.delete('/:categoryId', remove)

module.exports = router