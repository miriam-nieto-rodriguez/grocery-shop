const orderService = require('../services/order.service');

const getAll = async (req, res) => {
    try {
        const userId = req.user.id; // Obtiene el ID del usuario autenticado desde el token decodificado
        const orders = await orderService.getAllOrders(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los pedidos del usuario',
            error: error.message
        });
    }
}

const getById = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { orderId } = req.params;
        const order = await orderService.getOrderById(userId, orderId);

        if (!order) {
            return res.status(404).json({
                message: 'Pedido no encontrado'
            })
        }

        res.json(order);

    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener el pedido por ID',
            error: error.message
        })
    }
}

const create = async (req, res) => {
    try {
        const userId = req.user.id; // Obtiene el ID del usuario autenticado desde el token decodificado
        const { items } = req.body // Obtiene los items del cuerpo de la solicitud

        const order = await orderService.createOrder(userId, items); // Llama al servicio para crear la orden con el ID del usuario y los items proporcionados
        res.status(201).json(order); 


    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el pedido',
            error: error.message
        })

    }

}

module.exports= {
    getAll,
    getById,
    create
}