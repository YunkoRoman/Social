const express = require('express');
const path = require('path');
const Sequalize = require('sequelize');
const app = express();
const createUser = require('./controllers/user/CreateUser');
const authUser = require('./controllers/auth/authUser');
const FindUser = require('./controllers/user/FindUserbyName');
const friendRouter = require('./routes/friendRouter');
const changePassword = require('./controllers/auth/changePassword');
let sendChangeEmail = require('./controllers/auth/sendChangeEmail');
const dataBase = require('./dataBase').getInstance();
dataBase.setModels();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/friend', friendRouter);
app.post('/user', createUser);
app.post('/login',authUser);
app.get('/Finduser', FindUser);
app.post('user/password',changePassword);
app.get('/user/password', sendChangeEmail);









app.listen(3000, function () {
    console.log('Lissrening 3000 port');
});