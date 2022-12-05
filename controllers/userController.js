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
        const sendData = new sendMessage()
        sendData.sendMessage(req, res);
        
    }

}

module.exports = user;