import {DataTypes} from "sequelize";
import database from "../util/database";

const Order = database.define('order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

export default Order;