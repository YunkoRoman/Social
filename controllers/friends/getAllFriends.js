const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenFerifikator');
const Sequelize = require('sequelize');
const Op = require('sequelize').Op;

module.exports = async (req, res) =>{
    try {
        const responseObj = {};
        const FriendModel = db.getModel('friend');
        const UserModel = db.getModel('user');
        const SexModel = db.getModel('Sex')
        const token = req.get('Authorization');
        const {id} = tokenVerificator.auth(token);
        const {limit = 20, page = 0} = req.query;

        const friendCount =  await FriendModel.findOne({
            where:{
                [Op.or]: [
                    {
                        user_id: id,
                    },
                    {
                        friend_id: id,
                    }]
            },
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'friends_count']]
        });


        const allUsers = await FriendModel.findAll({
            include:[
                {
                    model:UserModel,
                    attributes:['name', 'surname'],
                    include:[{
                       model: SexModel,
                        attributes:['label']
                    }]
                }
            ],
            attributes:[],
            where:{
                [Op.or]: [
                    {
                        user_id: id,

                    },
                    {
                        friend_id: id,

                    }]},
                limit: +limit,
                offset: limit * page


        });
        responseObj.friends = allUsers;
        responseObj.pageCount = Math.ceil( friendCount.dataValues.friends_count / limit);


        res.json({
            success: true,
            msg:responseObj
        })
    }catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};