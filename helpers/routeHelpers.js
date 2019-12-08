//Joi is part op HapiJS, but useable everywhere
//easy to find on GitHub

//require('@hapi/joi") is nieuwer, maar begreep de werking niet 100%
const joi = require('joi');

//dit verwerkt de inputs niet zodanig dat men kan XSS'en.
//dat gebeurt later, net voor database access

//reden? XSS is edge case, maar hoe langer de requests duren
//hoe vervelender om XSS te proberen uitvoeren.
module.exports = {
    validateBody: (schemas) => {
        return (req, res, next) => {
            const result = joi.validate(req.body, schemas);
            if(result.error) {
                return res.status(400).json({
                    message : result.error.details[0].message
                  });
            } 
            if(!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
            //req.value.body instead of req.body
        }
    },

    //validateBody: (aanwezigeSchema) => {
    //    return (req, res, next) => {
    //        const result = joi.validate(req.body, aanwezigeSchema);
    //        if(result.error) {
    //            return res.redirect('../events');
    //        }
    //        if(!req.value) { req.value = {}; }
    //        req.value['body'] = result.value;
    //        next();
    //    }
    //},

    schemas: {
        authSchema: joi.object().keys({
            email: joi
            .string()
            .email()
            .min(5)
            .max(50)
            .required(),
            first_name: joi
            .string()
            .alphanum()
            .min(2)
            .max(20)
            .default("default"),
            last_name: joi
            .string()
            .min(2)
            .max(25)
            .default("default"),
            password: joi
            .string()
            .min(4)
            .max(20)
            .required()
        }),
        aanwezigeSchema: joi.object().keys({
            name: joi
            .string()
            .min(2)
            .max(35)
            .default("nobele onbekende")
        })
    }
}