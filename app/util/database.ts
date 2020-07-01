import {Sequelize} from "sequelize-typescript";
import path from "./path";
const database = new Sequelize({
    database: 'node-db',
    username: 'user',
    password: 'node-psw',
    dialect: "mysql",
    host: 'localhost',
    port: 3300,
    models: [path + '/**/*.model.ts']
});


export default database;