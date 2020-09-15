const nodemailer = require("nodemailer"),
    transporter = nodemailer.createTransport({
    host: 'cp-wc12.lon01.ds.network',
    port: 465,
    secure: true,
    auth: {
        user: 'contact@hoohoop.co.nz',
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    SendMail: (ToEmail, MailSubject, MailHTML) => {
        transporter.sendMail({
            from: '"HooHoop" <contact@hoohoop.co.nz>',
            to: ToEmail,
            subject: MailSubject,
            html: MailHTML
        })
    }
}