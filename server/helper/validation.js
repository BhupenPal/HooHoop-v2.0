module.exports = {

  PassCheck: (passcode, cpasscode) => {

    //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    // passcode.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,14}$/)
    if (passcode !== cpasscode) {
      return false
    }
    return true;
  }

}