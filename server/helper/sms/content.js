module.exports = {
    PhoneVerification: (FirstName, SecretToken) => {
        return `Hi ${FirstName}! \n Thank you for using HooHoop. You phone verification code is ${SecretToken}`
    }   
}