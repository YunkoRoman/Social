const Op = require('sequelize').Op;
const db= require('../../dataBase').getInstance();
const tokenVerifikator = require('../../helpers/tokenFerifikator');
module.exports =  async (req, res) => {
    try {
        const UserModel = db.getModel('user')
        const SexModel = db.getModel('Sex')
        console.log(UserModel);
        const {name} = req.query;
        const token = req.get('Authorization');
        if (!token) throw new Error('No token');
        const {id, name: UserName} = tokenVerifikator.auth(token);
        const UserIsRegister = await UserModel.findAll({
            where:{
                id,
                name:UserName
            }
        });
        if (!UserIsRegister) throw new Error('Not valid User ');
        if (!name) {
            const allUsers = await UserModel.findAll({
                attributes:["name", "surname", "sex_id"]

            });
            return res.json({
                success: true,
                msg: allUsers
            })
        };
        const allUsers = await UserModel.findAll({
                include:[SexModel],
               attributes:["name", "surname", "sex_id"],
               where: {
                   [Op.or]: [
                       {
                           name: {
                               [Op.like]: `%${name}%`
                           }
                       },
                       {
                           surname: {
                               [Op.like]: `%${name}%`
                           }
                       }]
               }

           });


        res.json({
            success: true,
            msg: allUsers
        });
    } catch (e) {
        console.log(e);
        res.status(400)
            .json({
                success: false,
                msg: e.message
            })
    }
};
