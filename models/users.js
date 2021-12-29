'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    ph_number: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    deletedAt:{
      allowNull: true,
      type: DataTypes.DATE,
      paranoid:true
    }
  }, {
    sequelize,
    paranoid:true,
    modelName: 'users',
  });

  users.readdata=async function(id){
    const row= await sequelize.models.users.findByPk(id);
    return row;
  };

  users.Insertdata=async function(record){
    const row=await sequelize.models.users.create(record);
    return row? 'Success' : 'Failed';
  }

  users.Deletedata = async function(idval){
    console.log("idval,",idval);
    const row=await sequelize.models.users.destroy({where: {id:idval}});
    console.log(row);
    return (row!==0)? 'Success' : 'Failed';
  }

  return users;
};