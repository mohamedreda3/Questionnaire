// const redis = require('../middlewares/redis');
const userMongoose = require('../models/userModel');

class user {

    async signUp(req, res) {
        const signup = require('./user/signup');
        const sign = new signup();
        sign.signUp(req, res);
    }

    async logIn(req, res) {
        const login = require('./user/login');
        const log = new login();
        log.logIn(req, res);
    }

    async sendMessage(req, res) {
        const sendMessage = require('./user/sendData');
        const sendData = new sendMessage();
        sendData.sendMessage(req, res);
    }

    async updateAnswered(req, res) {
        const updateAnswered = require('./user/updataUserData/updataAnswered');
        const UpdateAnswer = new updateAnswered();
        UpdateAnswer.updateAnswered(req, res);
    }

    async getData(req, res) {
        const getData = require('./user/listUsers/listUserData');
        const data = new getData();
        data.getData(req, res);
    }

}

module.exports = user;