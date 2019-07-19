const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenFerifikator');
const Op = require('sequelize').Op;

module.exports = async (req, res) =>{
    try {
        const FriendModel = db.getModel('friend');
        const UserModel = db.getModel('user')
        const token = req.get('Authorization');
        const {id} = tokenVerificator.auth(token);

        const userToAdd = req.params.id;
        if (!userToAdd || userToAdd < 1 || userToAdd == id ) throw new Error('Not valid id');

        await FriendModel.destroy({
            where:{
                [Op.or]: [
                    {
                        user_id: id,
                        friend_id:userToAdd
                    },
                    {
                        friend_id: id,
                        user_id:userToAdd
                    }]
            }
        });
        let all = await FriendModel.findAll({
            include:[UserModel]
        })

        res.json({
            success: true,
            msg: 'user deleted'
        })
    }catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};