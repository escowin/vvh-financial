const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {
    checkPassword(loginPw) {
        // oop | this acceses the user's password. compares the plain text to the hashed password. 
        return bcrypt.compareSync(loginPw, this.password)
    }   
}

// defines table columns & configuration
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4],
        },
      },
    },
    {
      // hashes password before user creation | hook is placed in second User.init object
      hooks: {
          // async - await
          async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
          },
          // hashes an updated password
          async beforeUpdate(updatedUserData) {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
          }
      },
      // table configuration
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "user",
    }
  );
  
module.exports = User;  