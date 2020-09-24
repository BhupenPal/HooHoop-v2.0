const Nexmo = require("nexmo"),
    nexmo = new Nexmo({
        apiKey: process.env.NEXMO_KEY,
        apiSecret: process.env.NEXMO_SECRET,
    });

module.exports = {
    SendSMS: (toPhone, SMSContent) => {
        nexmo.message.sendSms(
            "HooHoop NZ",
            toPhone,
            SMSContent,
            (err, responseData) => {
                console.log(err)
                console.log(responseData)
                if (err || responseData.messages[0]["status"] !== "0")
                    return false
                else
                    return true
            }
        );
    },
}