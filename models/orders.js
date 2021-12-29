'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      models.users.hasMany(orders,{
        foreignKey:'user_id'
      });
    }
  };
  orders.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    product: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    user_id:{
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    paranoid:true,
    modelName: 'orders',
  });

  orders.Insertdata=async function(record){
    console.log("record  ",record);
    const row=await sequelize.models.orders.create(record);
    return row? 'Success' : 'Failed';
  }

  orders.Deletedata = async function(idval,userid){
    const row=await sequelize.models.orders.destroy({where: {id:idval,user_id:userid}});
    console.log(row);
    return row? 'Success' : 'Order not found';
  }

  orders.ordersdata=async function(id){
    const row= await sequelize.models.orders.findAll({where:{user_id:id}});
    return row;
 };

  return orders;
};