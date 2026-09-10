const yup = require ('yup')

const categorySchema = yup.object({
    name: yup
    .string()
    .required('El nombre es obligatorio')
})

module.exports = categorySchema