import { registerAs } from "@nestjs/config";

export default registerAs("database" , () =>({
    host : process.env.DATABASE_HOST || "localhost" ,
    port : parseInt(process.env.DATABASE_PORT) || 5432,
    username : process.env.DATABASE_USER || "postgres",
    password : process.env.DATABASE_PASSWORD || "Mz-81-2008",
    name : process.env.DATABASE_NAME || "nestjs-blog",
    synchronize : process.env.DATABASE_SYNC === "true" ? true : false,
    autoLoadEntities : process.env.DATABASE_AUTOLOAD === "true" ? true : false,
}))