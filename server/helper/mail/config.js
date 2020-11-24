const axios = require('axios')
const RunPlatform = process.env.NODE_ENV === 'DEV' ? `http://${process.env.HOST_IP}:${process.env.CLIENT_PORT}` : 'https://www.hoohoop.co.nz'

module.exports = {
    SendMail: (ToEmail, MailSubject, MailContent) => {
        const transporter = {
            personalizations: [
                {
                    to: [{
                        email: ToEmail
                    }],
                    dynamic_template_data: {
                        ...MailContent.Data,
                        RunPlatform
                    },
                    subject: MailSubject
                }
            ],
            from: {
                email: 'contact@hoohoop.co.nz',
                name: 'HooHoop Contact'
            },
            reply_to: {
                email: 'contact@hoohoop.co.nz',
                name: 'HooHoop Contact'
            },
            template_id: MailContent.template_id
        }

        if (process.env.NODE_ENV === 'DEV') {
            transporter.mail_settings = {
                sandbox_mode: {
                    enable: true
                }
            }
        }

        axios({
            method: 'POST',
            url: 'https://api.sendgrid.com/v3/mail/send',
            data: transporter,
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`
            }
        })
            .then()
            .catch(error => console.log(error.message))
    }
}