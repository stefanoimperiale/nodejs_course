import mysql from "mysql2";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'user',
    database: 'node_complete',
    password: 'node-psw',
});

export default pool.promise();