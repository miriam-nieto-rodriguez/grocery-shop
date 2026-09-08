const yup = require ('yup')

const productSchema = yup.object({
    name: yup
    .string()
    .required('El nombre es obligatorio'),
    price: yup
    .number()
    .typeError('El precio debe ser un número válido')
    .positive('El precio debe ser un número positivo')
    .required('El precio es obligatorio'),
    image: yup
    .string()
    .required('La imagen es obligatoria'),
    description: yup
    .string()
    .required('La descripción es obligatoria'),
    stock: yup
    .number()
    .min(0, 'El stock no puede ser negativo')
    .typeError('El stock debe ser un número válido')
    .required('El stock es obligatorio')

})

module.exports = productSchema