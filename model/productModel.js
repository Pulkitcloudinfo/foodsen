
const conn = require('../config/config')

const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

const products = conn.define("products",{
    name:{
        type: DataTypes.STRING
    },
    category:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    measurement:{
        type: DataTypes.STRING
    },
    label:{
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


module.exports={products}

