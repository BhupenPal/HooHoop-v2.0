module.exports = {

  PassCheck: (passcode, cpasscode) => {

    //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    if (passcode !== cpasscode) {
      return false
    }
    return true;
  }

}