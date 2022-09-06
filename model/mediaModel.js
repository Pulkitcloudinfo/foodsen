

const Sequelize = require('sequelize');
const conn = require('../config/config');

const { DataTypes } = Sequelize;

const media = conn.define("media",{
    name:{
        type: DataTypes.STRING
    },
     videos:{
        type: DataTypes.JSON
    },
    description:{
        type: DataTypes.STRING
    },
    thumbnail:{
        type: DataTypes.JSON
    },
    status:{
        type: DataTypes.TINYINT
    },
    product_Id:{
        type: DataTypes.JSON
    },
    price_Id:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.INTEGER
    },
    expiry_date:{
        type: DataTypes.DATE
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


module.exports={media}
