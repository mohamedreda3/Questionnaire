const jwt = require('../../../middlewares/JWT');
const mongoose = require('../../../models/userModel');


module.exports = class ListUserData {
    constructor() { }
    getData = async (req, res) => {
        let authorization = req.headers.authorization;
        if (!authorization || authorization == '') {
            res.status(404).json({ Message: "Invalid Token Or Not Authorize" })
        } else {
            const getToken = authorization.split('Bearer')[1].trim();
            const jsonWebToken = new jwt();
            try {
                const { user } = jsonWebToken.verifyAccessToken(getToken);
                const findEmail = await mongoose.findOne({ Email: user.Email });
                if (!findEmail) {
                    res.status(403).json({ message: "User Not Found" });
                } else {
                    res.status(201).json(findEmail)
                }
            } catch (err) {
                res.status(403).json({ message: "Invalid Token" });
            }
        }
    }
}