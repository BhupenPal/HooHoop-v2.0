const nodemailer = require("nodemailer");

module.exports = {
    SendMail: (ToEmail, MailSubject, MailHTML) => {
        let transporter = nodemailer.createTransport({
            host: 'cp-wc12.lon01.ds.network',
            port: 465,
            secure: true,
            auth: {
                user: 'contact@hoohoop.co.nz',
                pass: process.env.EMAILPASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        transporter.sendMail({
            from: '"HooHoop" <contact@hoohoop.co.nz>',
            to: ToEmail,
            subject: MailSubject,
            html: MailHTML
        })
    }
}