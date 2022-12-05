const nodemailer = require("nodemailer");

module.exports = class SendEmail {
    // // constructor() { }
    // getCode() {
    //     let code = '';
    //     for (let i = 11; i < 17; i++) {
    //         code += Math.floor(Math.random() * i);
    //     }
    //     return code.substring(0, 6);
    // }

    async sendEmail(name, email, message) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "mmoh33650@gmail.com",
                pass: "dsvfgxvegtyimmka",
            }
        });
        let options = {
            from: `ApplicationName <${email}>`,
            to: "mmoh33650@gmail.com",
            subject: `Answer`,
            text: `Email from <a href="mailto:${email}">${email}</a> -- ${name}`,
            html: `
    <h1> Email from <a href="mailto:${email}">${email}</a> -- ${name}</h1>
    <h2>This code to verify your email: <h3><b>${message}</b></h3></h2>
    `, // html body
        };
        let info = await transporter.sendMail(options, (error) => {
            console.log(error);
        });
    }
}