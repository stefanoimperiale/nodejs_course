import {DataTypes} from "sequelize";
import database from "../util/database";

const OrderItem = database.define('orderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER
})

export default OrderItem;