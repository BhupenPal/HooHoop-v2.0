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

  PassCheck: (passcode, cpasscode) => {
    const PassRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,16}$/
    if (passcode !== cpasscode || !PassRegEx.test(passcode)) {
      return false
    }
    return true;
  },

  SearchRegex: text => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
  },

  RangeBasedFilter: ToCheck => {
    lower = parseInt(ToCheck.split("-")[0]);
    upper = parseInt(ToCheck.split("-")[1]);
    return { $gt: lower, $lt: upper };
  },

  FormDataBoolCheck: ToCheck => {
    return ToCheck === 'true' ? true : false
  },

  NameWithoutExt: FileName => {
    const LastDot = FileName.lastIndexOf(".")
    return LastDot === -1 ? FileName : FileName.substr(0, LastDot)
  }
}