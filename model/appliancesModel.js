const conn = require('../config/config')
const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

const kitchen_appliances = conn.define('kitchen_appliances',{
    name:{
        type: DataTypes.STRING
    },
    category:{
        type: DataTypes.INTEGER
    },
    scale:{
        type: DataTypes.STRING
    },
    min:{
        type: DataTypes.STRING
    },
    max:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.INTEGER
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    }
},

{
    freezeTableName:true
});
 
(async () => {
    await conn.sync();
})();


module.exports={kitchen_appliances}
