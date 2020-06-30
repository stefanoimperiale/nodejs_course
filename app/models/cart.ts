import {DataTypes} from "sequelize";
import database from "../util/database";

const Cart = database.define('cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    }
})

export default Cart;