const jwt = require('jsonwebtoken');
const { addTakeawayStaff } = require('../model/takeawayModel');
 const adminTakeawayModel = require('../model/takeawayModel');
const { use } = require('../route/router');
 
  
 const refreshToken = async(req, res) => {

    try {
        const refreshToken = req.cookies.refreshToken;
        const role = req.cookies.role
        const id = req.cookies.id
        const email = req.cookies.emailId
        if(!refreshToken && !role) return res.sendStatus(401);
        const user = await adminTakeawayModel.users.findAll({
            where:{
                refresh_token: refreshToken,
                role: role,
                id:id,
                email:email
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;

            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            const role = user[0].role
            // const role = jwt.sign({userId, name, email})
            // const role = role
           
      
            res.json({ accessToken, user});
            // res.send(role)
        });

    } catch (error) { 
        console.log(error);
    }
}
module.exports={refreshToken}