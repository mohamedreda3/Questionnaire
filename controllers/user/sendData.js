const sendEmail = require('../../middlewares/sendEmail');
const emailSender = new sendEmail();
const jwt = require('../../middlewares/JWT');
const mongoose = require('../../models/userModel');
module.exports = class SendMessage {
    constructor() { }
    sendMessage = async (req, res) => {
        let { message } = req.body;
        let authorization = req.headers.authorization;
        if (!req.headers.authorization || req.headers.authorization == '') {
            res.status(404).json({ Message: "Invalid Token Or Not Authorize" })
        } else {
            const getToken = req.headers.authorization.split('Bearer')[1].trim();
            const jsonWebToken = new jwt();
            try {
                const { user } = jsonWebToken.verifyAccessToken(getToken);
                const findEmail = await mongoose.findOne({ Email: user.Email });
                if (!findEmail) {
                    res.status(403).json({ message: "User Not Found" });
                } else {
                    if (findEmail.answered) {
                        res.status(403).json({ message: "You have already completed the survey" });
                    } else {
                        try {
                            await mongoose.updateOne({ Email: user.Email }, { $set: { answered: true } })
                            await emailSender.sendEmail(user.Email, message);
                            res.status(201).json({ message: "Success" });
                        } catch {
                            res.status(404).json({ message: "User Not Found" });
                        }
                    }
                }
            } catch {
                res.status(403).json({ message: "Invalid Token" })
            }

        }
    }
}