import {DataTypes} from "sequelize";
import database from "../util/database";

const CartItem = database.define('cartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER
})

export default CartItem;