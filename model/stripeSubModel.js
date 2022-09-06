const conn = require('../config/config')

const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

const users = conn.define('users',{
    name:{
        type: DataTypes.STRING
    },
    mobile:{
        type: DataTypes.STRING
    },
    owner:{
        type: DataTypes.STRING
    },
    staff:{
        type: DataTypes.INTEGER
    },
    type:{
        type: DataTypes.INTEGER
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    },
    created_by:{
        type: DataTypes.INTEGER
    },
    status:{
        type: DataTypes.INTEGER
    },
    profile_setup:{
        type: DataTypes.INTEGER
    },
    refresh_token:{
      type: DataTypes.TEXT
    },
    role:{
     type: DataTypes.TINYINT(1)
    },
    cus_stripe_acc_Id:{
        type: DataTypes.STRING
    },
    stripe_subscription_Id:{
       type: DataTypes.STRING
    }
},

{
    freezeTableName:true
});
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

const media_mapping_user = conn.define("media_mapping_users",{
    userId:{
        type: DataTypes.INTEGER
    },
    mediumId:{
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

users.hasOne(media_mapping_user)
media_mapping_user.belongsTo(users),

media.hasOne(media_mapping_user)
media_mapping_user.belongsTo(media),
 
(async () => {
    await conn.sync();
})();


module.exports={users,media_mapping_user, media}

