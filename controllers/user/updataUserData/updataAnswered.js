const sendEmail = require('../../../middlewares/sendEmail');
const emailSender = new sendEmail();
const jwt = require('../../../middlewares/JWT');
const mongoose = require('../../../models/userModel');
module.exports = class UpdateAnswered {
    constructor() { }
    updateAnswered = async (req, res) => {
        let { status } = req.body;
        let authorization = req.headers.authorization;
        if (status == null) {
            res.status(404).json({ Message: "Enter Status" })
        } else {
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
                        await mongoose.updateOne({ Email: user.Email }, { $set: { answered: status } })
                        res.status(201).json({ message: "Success" });
                    }
                } catch {
                    res.status(403).json({ message: "Invalid Token" })
                }
            }
        }
    }
}