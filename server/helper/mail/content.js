module.exports = {

   ContactMail: (Email, Subject, FullName, Message) => {
      return `
         <h1 style="color: red;">Email:</h1>
         <h1>${Email}</h1>
         <h1 style="color: red;">Subject:</h1>
         <h1>${Subject}</h1>
         <h1 style="color: red;">Name:</h1>
         <h1>${FullName}</h1>
         <h1 style="color: red;">Message:</h1>
         <h2>${Message}</h2>
      `
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