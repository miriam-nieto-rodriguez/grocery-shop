const Category = require('./category.model');
const Order = require('./order.model');
const OrderItem = require('./order_item.model');
const Product = require('./product.model');
const User = require('./user.model');

Order.belongsTo(User)
User.hasMany(Order) 
Product.belongsToMany(Order, {
    through: OrderItem
})
Order.belongsToMany(Product, {
    through: OrderItem
})
Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

Product.belongsToMany(Category, {
    through: 'productsCategory'
})

Category.belongsToMany(Product, {
    through: 'productsCategory'
})


module.exports = {
    Order,
    OrderItem,
    User,
    Product,
    Category
}