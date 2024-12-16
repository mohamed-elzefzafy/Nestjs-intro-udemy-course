import { DataSource } from "typeorm";

export default new DataSource({
   type : "postgres",
   host : "localhost",
   port : 5432,
   username : "postgres",
   password : "Mz-81-2008",
   database : "nestjs-blog",
   entities : ["**/*.entity.js"],
   migrations : ["migrations/*.js"],
})