const bcrypt = require('bcrypt')

module.exports = {
  GenerateOTP: () => {
    return Math.floor(100000 + Math.random() * 900000);
  },

  GenerateRandom: (digits) => {
    var RandomString = "";
    var possible =
      "YU3IOAT1a8NM6qSKt1yuszxc6HJ2bXCVBERwe9rklL5Zv4dfghj5DFG27iopWnm3QP4";
    for (var i = 0; i < digits; i++) {
      RandomString += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }
    return RandomString;
  },

  HashSalt: async (Passcode) => {
    return await new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (err, salt) =>
        bcrypt.hash(Passcode, salt, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        })
      )
    })
  },

  FlightReset: (Pilot) => {
    Pilot.status = 'failed'
    Pilot.news = []
  }
}