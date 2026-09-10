const yup = require('yup')

const registerSchema = yup.object({
    name: yup
        .string()
        .required('El nombre es obligatorio'),
    surname: yup
        .string()
        .required('El apellido es obligatorio')
        .lowercase()
        .trim(),
    phone: yup
        .string()
        .trim()
        .max(15)
        .nullable(),
    address: yup
        .string()
        .trim()
        .max(50)
        .required('La dirección es obligatoria'),
    city: yup
        .string()
        .trim()
        .max(50)
        .required('La ciudad es obligatoria'),
    country: yup
        .string()
        .trim()
        .max(50)
        .required('El país es obligatorio'),
    code_postal: yup
        .string()
        .trim()
        .max(15)
        .required('El código postal es obligatorio'),
    email: yup
        .string()
        .required('Email y contraseña son obligatorios')
        .trim()
        .lowercase()
        .email('El formato del email no es válido'),
    password: yup
        .string()
        .required('Email y contraseña son obligatorios')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
})


const loginSchema = yup.object({
    email: yup
        .string()
        .required('El email es obligatorio')
        .trim()
        .lowercase()
        .email('El formato del email no es válido'),
    password: yup
        .string()
        .required('La contraseña es obligatoria')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')

})

module.exports = {
    registerSchema,
    loginSchema
}