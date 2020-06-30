import {Sequelize} from "sequelize";

const database = new Sequelize('node-db', 'user', 'node-psw', {
    dialect: "mysql",
    host: 'localhost',
    port: 3300
});

export default database;