function validateSchema(schema, source = "body") {
    return async function validateRequest(req, res, next) {
        try {
            const validated = await schema.validate(req[source], { // req[source] es una forma dinamica de escribir req.body
                abortEarly: false, // con esto yup comprueba todos los campos y te devuelve todos los errores 
                stripUnknown: true, // si el usuario manda campos que no existen en el schema, yup los elimina silenciosamente 
            });

            if (source === "query") {
                req.validatedQuery = validated;
            } else if (source === "params") {
                req.params = validated;
            } else if (source === "body") {
                req.body = validated;
            }

            next();
        } catch ({
            errors
        }) {
            return res.status(400).json(errors);
        }
    };
}

module.exports = validateSchema