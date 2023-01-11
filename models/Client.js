const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Client extends Model {}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isPhone: true,
      // },
    },
    contact_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [5],
      },
    },
  },
  {
    // table configuration
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "client",
  }
);

module.exports = Client;
