const userMongoose = require('../../models/userModel');
const md5 = require('md5');
const jwt = require('../../middlewares/JWT');
const jsonWebToken = new jwt();

module.exports = class SignUp {
    constructor() { }
    async signUp(req, res) {
        let { name, email, password } = req.body;
        if (password == null || password == '' || email == null || email == '') {
            res.status(404).json({ Message: "enter Email and Password" });
        }
        else {
            const pass = md5(password);
            const Email = email;
            const findEmail = await userMongoose.findOne({ Email });
            if (findEmail != null) {
                res.status(404).json({ Message: "User Found" });
            } else {
                await new userMongoose({ name, Email, pass }).save()
                    .then(async response => {
                        const accessToken = jsonWebToken.exportAccessToken({ Email: Email });
                        res.status(201).json({ response, accessToken })
                    })
                    .catch(error => res.status(404).json({ Message: error }))
            }
        }
    }
}