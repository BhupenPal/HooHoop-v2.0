module.exports = {

   ContactMail: (Email, Subject, FullName, Message) => {
      return {
         templateId: 'd-7f4db062ff1344318d7c5a5aa55bb99c',
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
            CustomerName: FirstName,
            SecretToken: SecretToken
         }
      }
   }

}