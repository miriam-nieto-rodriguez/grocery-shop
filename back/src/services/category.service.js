const Category = require('../models/category.model')

const getAllCategories = async () => {
    return await Category.findAll()
}

const getCategoryById = async (categoryId) => {
    return await Category.findByPk(categoryId)
}

const createCategory = async (data) => {
    return await Category.create(data)
}

const editCategory = async (categoryId, data) =>{
    const category = await Category.findByPk(categoryId)
    if (!category) return null
    return await category.update(data)

}

const removeCategory = async (categoryId) => {
    const category = await Category.findByPk(categoryId)
    if(!category) return null
    await category.destroy()
    return category
}

module.exports =  {
    getAllCategories,
    getCategoryById,
    createCategory,
    editCategory,
    removeCategory
}