const categories_service = require('../services/category.service')

const getAll = async (req, res) => {
    try {
        const categories = await categories_service.getAllCategories()
        res.json(categories)

    } catch (error) {

        return res.status(500).json({
            message: 'Error al obtener todas las categorias',
            error: error.message
        })
    }
}

const getById = async (req, res) => {
    try {
        const {
            categoryId
        } = req.params

        const category = await categories_service.getCategoryById(categoryId)

        if (!category) return res.status(404).json({
            message: 'Categoría no encontrada'
        })

        res.json(category)

    } catch (error) {

        return res.status(500).json({
            message: 'Error al obtener el id de la categoría',
            error: error.message
        })
    }
}

const create = async (req, res) => {
    try {
        const new_category = await categories_service.createCategory(req.body)
        res.status(201).json(new_category)

    } catch (error) {
        res.status(400).json(error.message)
    }
}

const edit = async (req, res) => {
    try {
        const {
            categoryId
        } = req.params

        const category = await categories_service.editCategory(categoryId, req.body)
        if (!category) return res.status(404).json({
            message: 'Categoría no encontrada'
        })
        res.json(category)

    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar la categoría',
            error: error.message
        })
    }
}

const remove = async (req, res) => {
    try {
        const {
            categoryId
        } = req.params

        const category = await categories_service.removeCategory(categoryId)
        if (!category) return res.status(404).json({
            message: 'Categoría no encontrada'
        })

        res.status(204).end()

    } catch (error) {
        return res.status(500).json({
            message: 'Error al borrar la categoría',
            error: error.message
        })
    }
}

module.exports = {
    getAll,
    getById,
    create,
    edit, 
    remove
}