module.exports = {

   ContactMail: (Email, Subject, FullName, Message) => {
      return {
         templateId: '',
         Data: {
            CustomerEmail: Email,
            CustomerName: FullName,
            MessageByCustomer: Message,
            SubjectByCustomer: Subject
         }
      }
   },

   //Email verification with secret token; for signup
   AccActivationMail: (FirstName, SecretToken) => {
      return {
         templateId: 'd-70629e5f131344819b4d6ef309823693',
         Data: {
            FirstName: FirstName,
            SecretToken: SecretToken
         }
      }
   }

}