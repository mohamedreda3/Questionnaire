const nodemailer = require("nodemailer");

module.exports = class SendEmail {

    async sendEmail(email, Message) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "mmoh33650@gmail.com",
                pass: "dsvfgxvegtyimmka",
            },
        });

        let info = await transporter.sendMail({
            from: '"Mohammed Reda" mmoh33650@gmail.com', // sender address
            to: email, // list of receivers
            subject: `Verify Your Email`, // Subject line
            text: `verify your email`,// plain text body
            html: `<h2>This code to verify your email: <h1><b>${Message}</b></h1></h2>`, // html body
        });

        return { Message: Message }
    }
}