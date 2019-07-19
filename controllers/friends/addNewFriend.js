const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenFerifikator');
const Op = require('sequelize').Op;
module.exports =  async (req, res) =>{
    try {
        const FriendModel = db.getModel('friend');
        // const UserdModel = db.getModel('User');
        const token = req.get('Authorization');
        const {id} = tokenVerificator.auth(token);
        const userToAdd = req.params.id;
        if (!userToAdd || userToAdd < 1 || userToAdd == id ) throw new Error('Not valid id');
        const FriendIsadded =
            await FriendModel.findOne({
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
        if (FriendIsadded) throw new Error('friend has already been added')

        await FriendModel.create({
            user_id:id,
            friend_id:userToAdd
        });



        res.json({
            success: true,
            msg:'User added'
        })
    }catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};