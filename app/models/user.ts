import {
    Model,
    DataTypes,
    Optional
} from "sequelize";
import database from "../util/database";

interface UserAttributes {
    id: number,
    name: string,
    email: string | null
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string | null;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING
},
    {
        tableName: 'users',
        sequelize: database
    })

export default User;