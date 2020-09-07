module.exports = {

  PassCheck: (passcode, cpasscode) => {

    //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    if (passcode !== cpasscode || !passcode.match(/'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$'/)) {
      return false
    }

    return true
  }

}