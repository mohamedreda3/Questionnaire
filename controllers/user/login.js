const userMongoose = require('../../models/userModel');
const md5 = require('md5');
const jwt = require('../../middlewares/JWT');
const jsonWebToken = new jwt();


module.exports = class LogIn {
    constructor() { }
    async logIn(req, res) {
        let { email, password } = req.body;
        if (email == null || password == null || password.length == 0 || email.length == 0) {
            res.status(404).json({ Message: "Enter Email And Password" });
        } else {
            const pass = md5(password);
            const Email = email;
            const findEmail = await userMongoose.findOne({ Email });
            if (!findEmail) {
                res.status(404).json({ Message: "User Not Found" });
            } else {
                const authPassword = await userMongoose.findOne({ Email, pass });
                if (!authPassword) {
                    res.status(404).json({ Message: "Email Or Password is Wrong" });
                } else {
                    await userMongoose.findOne({ Email: Email, pass: pass })
                        .then(response => {
                            const accessToken = jsonWebToken.exportAccessToken({ Email: Email });
                            res.status(201).json({ response, accessToken })
                        })
                        .catch(error => res.status(404).json({ Message: error }))
                }
            }
        }
    }
}