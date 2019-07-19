const jwt = require('jsonwebtoken');
const {secret, PassSecret} = require('../constants/secret');

module.exports.auth = (data) =>{return jwt.sign(data,secret,{expiresIn: '30d'})};
module.exports.password = (data) =>{return jwt.sign(data,PassSecret,{expiresIn: 600})};

