import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production', 'staging')
    .default('development'),
    // database 
    DATABASE_PORT : Joi.number().port().default(5432),
    DATABASE_PASSWORD : Joi.string().required(),
    DATABASE_HOST : Joi.string().required(),
    DATABASE_NAME : Joi.string().required(),
    DATABASE_USER : Joi.string().required(),
    DATABASE_SYNC : Joi.string().required(),
    DATABASE_AUTOLOAD : Joi.string().required(),
    PROFILE_API_KEY : Joi.string().required(),

  //  jwt 
    JWT_SECRET : Joi.string().required(),
    JWT_TOKEN_AUDIENCE : Joi.string().required(),
    JWT_TOKEN_ISSUER : Joi.string().required(),
    JWT_TOKEN_TTL:Joi.number().required(), 

    //  jwt refresh token
    JWT_REFRESH_TOKEN_TTL:Joi.number().required(), 

    API_VERSION: Joi.string().required(),
});