const Category = require('../models/category.model')

const getAllCategories = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const { count, rows } = await Category.findAndCountAll({
        offset,
        limit
    });
    return {
        total: count,
        categories: rows
    }
}

const getCategoryById = async (categoryId) => {
    return await Category.findByPk(categoryId)
}

const createCategory = async (data) => {
    return await Category.create(data)
}

const editCategory = async (categoryId, data) => {
    const category = await Category.findByPk(categoryId)
    if (!category) return null
    return await category.update(data)

}

const removeCategory = async (categoryId) => {
    const category = await Category.findByPk(categoryId)
    if (!category) return null
    await category.destroy()
    return category
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    editCategory,
    removeCategory
}